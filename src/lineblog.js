import urljoin from 'url-join';
import rp from 'request-promise';
import { convertHtmlToHtmlString } from './util';
import Article from './models/Article';
import { renderToStaticMarkup } from 'react-dom/server';
import { renderTweetCard, renderInstgramCard } from './util';

const dparser = new DOMParser();

class LineBlog {
	constructor() {}

	/**
	 * @param {string}
	 */
	getURL(id) {
		return `https://lineblog.me/${id}`;
	}

	async idToImageUrlAndName(id) {
		const body = await rp(this.getURL(id));
		const $parsed = dparser.parseFromString(body, 'text/html');

		return {
			name: $parsed.querySelector('h2').innerText,
			url: $parsed.querySelector('.profile-photo-thumbnail img').src
		};
	}

	/**
	 * @param {string} id
	 * @param {number?} page
	 * @param {{}} options
	 */
	async fetch(id, page, options) {
		const { pages } = options;
		const ret = [];

		for (let i = 0; i < pages; i += 1) {
			const body = await rp(
				urljoin(this.getURL(id), `?p=${page * pages + i + 1}`)
			);
			const $parsed = dparser.parseFromString(body, 'text/html');

			for (const $article of $parsed.querySelectorAll('.article')) {
				const $title = $article.querySelector('.article-title a');
				const mediaDic = {};
				let $content = $article.querySelector('.article-body');

				for (const $emoji of $content.querySelectorAll('.lineemoji')) {
					$emoji.alt = 'lineemoji';
				}

				for (const $tweet of $content.querySelectorAll(
					'.twitter-tweet'
				)) {
					const key = `_tweet_${Date.now()}`;

					mediaDic[key] = renderToStaticMarkup(
						await renderTweetCard($tweet.children[1].href)
					);
					$tweet.innerText = key;
				}

				for (const $instagram of $content.querySelectorAll(
					'.instagram-media'
				)) {
					const key = `_instagram_${Date.now()}`;

					mediaDic[key] = renderToStaticMarkup(
						await renderInstgramCard(
							$instagram.dataset.instgrmPermalink
						)
					);
					$instagram.innerText = key;
				}

				ret.push(
					new Article({
						date: new Date(
							$article.querySelector('.article-date').innerText
						),
						title: $title.innerText,
						name: $parsed.querySelector('h2').innerText,
						content: convertHtmlToHtmlString($content)
							.replace(
								/<img\s+src="(https:\/\/parts\.lineblog\.me\/img\/emoji\/line\/\d+\/\d+\.png)"\s+alt="lineemoji">/g,
								(match, p1) => {
									return `<img src="${p1}" style="width:1.3em;height:1.3em;position:relative;top:0.2em;" alt="lineemoji">`;
								}
							)
							.replace(
								/<blockquote>\n<p>([\s\S]+)<\/p>\n<\/blockquote>/g,
								(match, key) => {
									return mediaDic[key];
								}
							),
						url: $title.href
					})
				);
			}
		}

		return ret;
	}
}

export default new LineBlog();
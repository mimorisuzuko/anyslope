import urljoin from 'url-join';
import rp from 'request-promise';
import { convertHtmlToHtmlString } from './util';
import Article from './models/Article';
import { renderToStaticMarkup } from 'react-dom/server';
import { renderTweetCard, renderInstgramCard, renderOgpCard } from './util';
import dayjs from 'dayjs';
import React from 'react';

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

	async fetch(entry) {
		const ret = [];
		const _ids = entry.get('_ids');
		const { size } = _ids;
		const page = entry.get('page');

		for (let i = 0; i < size; i += 1) {
			const pages = entry.getIn(['_optionsList', i, 'pages']);
			for (let j = 0; j < pages; j += 1) {
				const body = await rp(
					urljoin(this.getURL(_ids.get(i)), `?p=${page * pages + j}`)
				);
				const $parsed = dparser.parseFromString(body, 'text/html');

				for (const $article of $parsed.querySelectorAll('.article')) {
					const $title = $article.querySelector('.article-title a');
					const mediaDic = {};
					let $content = $article.querySelector('.article-body');

					for (const $emoji of $content.querySelectorAll(
						'.lineemoji'
					)) {
						$emoji.alt = 'lineemoji';
					}

					for (const $tweet of $content.querySelectorAll(
						'.twitter-tweet'
					)) {
						const key = `_tweet_${Date.now()}`;

						mediaDic[key] = renderToStaticMarkup(
							await renderTweetCard($tweet.children[1].href)
						);
						$tweet.outerHTML = key;
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
						$instagram.outerHTML = key;
					}

					for (const $video of $content.querySelectorAll(
						'.uploaded-video'
					)) {
						const { src } = $video.querySelector('source');
						const key = `_video_${Date.now()}`;

						mediaDic[key] = renderToStaticMarkup(
							<p>
								<video controls src={src} />
							</p>
						);
						$video.outerHTML = key;
					}

					for (const $ogp of $content.querySelectorAll('.ogpLink')) {
						const key = `_ogp_${Date.now()}`;

						mediaDic[key] = renderToStaticMarkup(
							await renderOgpCard($ogp.href)
						);
						$ogp.outerHTML = key;
					}

					ret.push(
						new Article({
							date: dayjs(
								$article.querySelector('.article-date')
									.innerText
							),
							title: $title.innerText,
							author: $parsed.querySelector('h2').innerText,
							content: $content.innerText,
							html: convertHtmlToHtmlString($content)
								.replace(
									/<img\s+src="(https:\/\/parts\.lineblog\.me\/img\/emoji\/line\/\d+\/\d+\.png)"\s+alt="lineemoji">/g,
									(match, p1) => {
										return `<img src="${p1}" style="width:1.3em;height:1.3em;position:relative;top:0.2em;" alt="lineemoji">`;
									}
								)
								.replace(
									/<p>(_(video|instagram|tweet|ogp)_\d+)<\/p>/g,
									(match, key) => {
										return mediaDic[key];
									}
								),
							url: $title.href
						})
					);
				}
			}
		}

		return ret;
	}
}

export default new LineBlog();

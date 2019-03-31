import urljoin from 'url-join';
import rp from 'request-promise';
import { convertHtmlToHtmlString } from './util';
import Article from './models/Article';
import fecha from 'fecha';

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
				const tweetDic = {};
				let $content = $article.querySelector('.article-body');

				for (const $emoji of $content.querySelectorAll('.lineemoji')) {
					$emoji.alt = 'lineemoji';
				}

				for (const $tweet of $content.querySelectorAll(
					'.twitter-tweet'
				)) {
					const { href } = $tweet.children[1];
					const body = await rp(href);
					const [, sceenname] = href.match(
						/https:\/\/twitter.com\/(.+)\/status/
					);
					const [, username] = body.match(
						/<meta\s+property="og:title"\s+content="(.+)\s+on Twitter">/
					);
					const [, picUrl] = body.match(
						/<meta\s+property="og:image"\s+content="(.+):large">/
					);
					const [, text] = body.match(
						/<meta\s+property="og:description"\s+content="“(.+)”">/
					);
					const [, iconUrl] = body.match(
						/<img\s+class="ProfileAvatar-image\s+"\s+src="(.+)"\s+alt=".+">/
					);
					const [, datestr] = body.match(/data-time-ms="(\d+)"/);
					const key = `_tweet_${Date.now()}`;
					const date = fecha.format(
						new Date(parseInt(datestr)),
						'HH:mm - YY年MM月DD日'
					);

					$tweet.innerText = key;
					tweetDic[key] = `
						<a href="${href}" style="color:inherit;text-decoration:none;cursor:pointer;">
							<div style="max-width:500px;border-radius:4px;border:1px solid rgb(225, 232, 237);">
								<div style="padding:16px;">
									<div style="padding-bottom:8px;">
										<div style="display:flex;line-height:1.2;">
											<img src="${iconUrl}" style="width:36px;height:36px;border-radius: 50%;margin-right:8px;">
											<div style="display:flex;flex-direction: column;">
												<span style="font-weight:bold;">${username}</span>
												<span style="color:rgb(101, 119, 134);font-size:0.9rem;">@${sceenname}</span>
											</div>
										</div>
									</div>
									<div>
										${text.trim().replace(/&#10;/g, '<br>')}
										<div style="color:rgb(105, 120, 130);font-size:0.9rem;">${date}</div>
										<img src="${picUrl}" style="width:100%;display:block;border-radius:12px;margin-top:8px;">
									</div>
								</div>
							</div>
						</a>
					`;
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
									return tweetDic[key];
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

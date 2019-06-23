import urljoin from 'url-join';
import rp from 'request-promise';
import { convertHtmlToHtmlString } from './util';
import Article from './models/Article';
import { renderToStaticMarkup } from 'react-dom/server';
import { renderTweetCard, renderInstgramCard, renderOgpCard } from './util';
import dayjs from 'dayjs';
import React from 'react';
import _ from 'lodash';

const dparser = new DOMParser();

export default class LineBlog {
	/**
	 * @param {string}
	 */
	static getURL(id) {
		return `https://lineblog.me/${id}`;
	}

	static async idToImageUrlAndName(id) {
		const body = await rp(LineBlog.getURL(id));
		const $parsed = dparser.parseFromString(body, 'text/html');

		return {
			name: $parsed.querySelector('h2').innerText,
			url: $parsed.querySelector('.profile-photo-thumbnail img').src
		};
	}

	static async parse(body) {
		const $parsed = dparser.parseFromString(body, 'text/html');
		const ret = [];

		for (const $article of $parsed.querySelectorAll('.article')) {
			const $title = $article.querySelector('.article-title a');
			const mediaDic = {};
			let $content = $article.querySelector('.article-body');

			for (const $tweet of $content.querySelectorAll('.twitter-tweet')) {
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

			for (const $video of $content.querySelectorAll('.uploaded-video')) {
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

			ret.push({
				date: dayjs($article.querySelector('.article-date').innerText),
				title: $title.innerText,
				author: $parsed.querySelector('h2').innerText,
				content: $content.innerText,
				html: convertHtmlToHtmlString($content)
					.replace(
						/<img\s+src="(https:\/\/parts\.lineblog\.me\/img\/emoji\/line\/\d+\/\d+\.png)".+>/g,
						(match, p1) => {
							return `<img src="${p1}" style="width:1.3em;height:1.3em;position:relative;top:0.2em;" alt="emoji">`;
						}
					)
					.replace(
						/<p>(_(video|instagram|tweet|ogp)_\d+)<\/p>/g,
						(match, key) => {
							return mediaDic[key];
						}
					),
				url: $title.href
			});
		}

		return ret;
	}

	static async fetch(entry) {
		const ret = [];
		const _ids = entry.get('_ids');
		const { size } = _ids;
		const page = entry.get('page');

		for (let i = 0; i < size; i += 1) {
			const options = entry.getIn(['_optionsList', i]);
			const multi = options.get('multi');
			const filters = options.get('filters');

			for (let j = 0; j < multi; j += 1) {
				ret.push(
					..._.map(
						await LineBlog.parse(
							await rp(
								urljoin(
									LineBlog.getURL(_ids.get(i)),
									`?p=${page * multi + j}`
								)
							)
						),
						(a) => {
							return new Article({
								...a,
								filtered: filters.some((filter) => {
									return (
										origin[filter.get(0)].match(
											filter.get(1)
										) === null
									);
								})
							});
						}
					)
				);
			}
		}

		return ret;
	}
}

import urljoin from 'url-join';
import rp from 'request-promise';
import { convertHtmlToHtmlString } from './util';
import Article from './models/Article';
import dayjs from 'dayjs';

const dparser = new DOMParser();

class Ameblo {
	constructor() {}

	/**
	 * @param {string}
	 */
	getURL(id) {
		return `https://ameblo.jp/${id}/`;
	}

	async idToImageUrlAndName(id) {
		const body = await rp(this.getURL(id));
		const $parsed = dparser.parseFromString(body, 'text/html');

		return {
			name: $parsed.querySelector('.skin-profileName').innerText,
			url: $parsed.querySelector('.skin-profileAvatar img').src
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
				urljoin(this.getURL(id), `/page-${page * pages + i + 1}.html`)
			);
			const $parsed = dparser.parseFromString(body, 'text/html');

			for (const $article of $parsed.querySelectorAll(
				'.skin-blogMainInner.skin-bgMain'
			)) {
				const $title = $article.querySelector('a.skinArticleTitle');
				const $content = $article.querySelector('.skin-entryBody');

				ret.push(
					new Article({
						date: dayjs(
							$article.querySelector('.skin-textQuiet').innerText
						),
						title: $title.innerText,
						author: $parsed.querySelector('.skin-profileName')
							.innerText,
						content: $content.innerText,
						contentHtml: convertHtmlToHtmlString($content),
						url: $title.href
					})
				);
			}
		}

		return ret;
	}
}

export default new Ameblo();

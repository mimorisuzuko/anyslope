import urljoin from 'url-join';
import rp from 'request-promise';
import { convertHtmlToHtmlString } from './util';
import Article from './models/Article';
import dayjs from 'dayjs';
import _ from 'lodash';

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

	async fetch({ _ids, page, _optionsList }) {
		const ret = [];
		const { length } = _ids;

		for (let i = 0; i < length; i += 1) {
			const { pages } = _optionsList[i];
			for (let j = 0; j < pages; j += 1) {
				const body = await rp(
					urljoin(
						this.getURL(_ids[i]),
						`/page-${page * pages + j}.html`
					)
				);
				const $parsed = dparser.parseFromString(body, 'text/html');

				for (const $article of $parsed.querySelectorAll(
					'.skin-entry.js-entryWrapper'
				)) {
					const $title = $article.querySelector('a.skinArticleTitle');
					const $content = $article.querySelector('.skin-entryBody');

					ret.push(
						new Article({
							date: dayjs(
								_.nth(
									$article.querySelector('.skin-textQuiet')
										.childNodes,
									-1
								)
									.nodeValue.replace(/[年|月|日]/g, '/')
									.replace(/[時|分|秒]/g, ':')
							),
							title: $title.innerText,
							author: $parsed.querySelector('.skin-profileName')
								.innerText,
							content: $content.innerText,
							html: convertHtmlToHtmlString($content),
							url: $title.href
						})
					);
				}
			}
		}

		return ret;
	}
}

export default new Ameblo();

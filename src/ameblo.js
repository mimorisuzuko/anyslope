import urljoin from 'url-join';
import rp from 'request-promise';
import { convertHtmlToHtmlString } from './util';
import Article from './models/Article';
import dayjs from 'dayjs';
import _ from 'lodash';

const dparser = new DOMParser();

class Ameblo {
	static get URL_ORIGIN() {
		return 'https://ameblo.jp';
	}

	/**
	 * @param {string}
	 */
	static getURL(id) {
		return urljoin(Ameblo.URL_ORIGIN, id);
	}

	async idToImageUrlAndName(id) {
		const body = await rp(Ameblo.getURL(id));
		const $parsed = dparser.parseFromString(body, 'text/html');

		return {
			name: $parsed.querySelector('.skin-profileName').innerText,
			url: $parsed.querySelector('.skin-profileAvatar img').src
		};
	}

	async fetch(entry) {
		const ret = [];
		const _ids = entry.get('_ids');
		const { size } = _ids;
		const page = entry.get('page');

		for (let i = 0; i < size; i += 1) {
			const options = entry.getIn(['_optionsList', i]);
			const multi = options.get('multi');
			const filters = options.get('filters');

			for (let j = 0; j < multi; j += 1) {
				const url = Ameblo.getURL(_ids.get(i));
				const body = await rp(
					urljoin(url, `/page-${page * multi + j}.html`)
				);
				const $parsed = dparser.parseFromString(body, 'text/html');

				for (const $article of $parsed.querySelectorAll(
					'.skin-entry.js-entryWrapper'
				)) {
					const $title = $article.querySelector('a.skinArticleTitle');
					const $content = $article.querySelector('.skin-entryBody');
					const origin = {
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
						html: convertHtmlToHtmlString($content).replace(
							/<img\s+src="(https:\/\/stat100.ameba.jp\/blog\/ucs\/img\/char\/\w+\/\w+\.png)".+>/g,
							(match, p1) => {
								return `<img src="${p1}" width="24" width="24" alt="emoji">`;
							}
						),
						url: urljoin(url, _.last($title.href.split('/')))
					};

					ret.push(
						new Article({
							...origin,
							filtered: filters.some((filter) => {
								return (
									origin[filter.get(0)].match(
										filter.get(1)
									) === null
								);
							})
						})
					);
				}
			}
		}

		return ret;
	}
}

export default new Ameblo();

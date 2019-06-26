import urljoin from 'url-join';
import rp from 'request-promise';
import { convertHtmlToHtmlString } from './util';
import Article from './models/Article';
import dayjs from 'dayjs';
import _ from 'lodash';
import { remote } from 'electron';

const puppeteer = remote.require('puppeteer');
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

	static parse(body) {
		const $parsed = dparser.parseFromString(body, 'text/html');
		const ret = [];

		for (const $article of $parsed.querySelectorAll(
			'.skin-entry.js-entryWrapper'
		)) {
			const $title = $article.querySelector('a.skinArticleTitle');
			const $content = $article.querySelector('.skin-entryBody');

			ret.push({
				date: dayjs(
					_.nth(
						$article.querySelector('.skin-textQuiet').childNodes,
						-1
					)
						.nodeValue.replace(/[年|月|日]/g, '/')
						.replace(/[時|分|秒]/g, ':')
				),
				title: $title.innerText,
				author: $parsed.querySelector('.skin-profileName').innerText,
				content: $content.innerText,
				html: convertHtmlToHtmlString($content).replace(
					/<img\s+src="(https:\/\/stat100.ameba.jp\/blog\/ucs\/img\/char\/\w+\/\w+\.png)".+>/g,
					(match, p1) => {
						return `<img src="${p1}" width="24" width="24" alt="emoji">`;
					}
				),
				url: urljoin(
					Ameblo.URL_ORIGIN,
					...$title.href.split('/').slice(-2)
				)
			});
		}

		return ret;
	}

	static async idToImageUrlAndName(id) {
		const browser = await puppeteer.launch({
			args: ['--lang=ja,en-US,en']
		});
		const page = await browser.newPage();

		await page.goto(Ameblo.getURL(id));
		await page.waitForSelector('.skin-profileName', { visible: true });
		await page.waitForSelector('.skin-profileAvatar img', {
			visible: true
		});
		const ret = await page.evaluate(`(async() => {
				return {
					name: document.querySelector('.skin-profileName').innerText,
					url: document.querySelector('.skin-profileAvatar img').src
				};
			})()`);

		browser.close();

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
						Ameblo.parse(
							await rp(
								urljoin(
									Ameblo.getURL(_ids.get(i)),
									`/page-${(page - 1) * multi + j + 1}.html`
								)
							)
						),
						(origin) => {
							return new Article({
								...origin,
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

export default Ameblo;

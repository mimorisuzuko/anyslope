import anyzakaJSON from './assets/anyzaka.json';
import _ from 'lodash';
import { ICONS_DIR, EXTRA_ICONS_DIR } from './config';
import libpath from 'path';
import rp from 'request-promise';
import Article from './models/Article';
import { convertHtmlToHtmlString } from './util';
import liburl from 'url';
import dayjs from 'dayjs';
import lineblog from './lineblog';
import ameblo from './ameblo';
import fs from 'fs-extra';

const dparser = new DOMParser();

const fetchNogi = async ({ page }) => {
	const body = await rp(`http://blog.nogizaka46.com/?p=${page}`);
	const $parsed = dparser.parseFromString(body, 'text/html');
	const names = $parsed.querySelectorAll('.author');
	const titles = $parsed.querySelectorAll('h1 .entrytitle a');
	const contents = $parsed.querySelectorAll('.entrybody');
	const dates = $parsed.querySelectorAll('.entrybottom');
	const { length } = dates;
	const ret = [];

	for (let i = 0; i < length; i += 1) {
		const $content = contents[i];

		ret.push(
			new Article({
				date: dayjs(dates[i].childNodes[0].nodeValue.slice(0, -1)),
				title: titles[i].innerText,
				author: names[i].innerText.replace(/\s/g, ''),
				html: convertHtmlToHtmlString($content),
				content: $content.innerText,
				url: titles[i].href
			})
		);
	}

	return ret;
};

const fetchKeyaki = async ({ page }) => {
	const baseUrl = `http://www.keyakizaka46.com/s/k46o/diary/member/list?page=${page}`;
	const body = await rp(baseUrl);

	return _.map(
		dparser.parseFromString(body, 'text/html').querySelectorAll('article'),
		($article) => {
			const { innerText: datestr } = $article.querySelector(
				'.box-bottom li'
			);
			const $title = $article.querySelector('h3 a');
			const { innerText: name } = $article.querySelector('.name');
			const $content = $article.querySelector('.box-article');

			return new Article({
				date: dayjs(datestr),
				title: $title.innerText.trim(),
				author: name.replace(/\s/g, ''),
				html: convertHtmlToHtmlString($content),
				content: $content.innerText,
				url: liburl.resolve(baseUrl, $title.pathname)
			});
		}
	);
};

const fetchHinata = async ({ page }) => {
	const baseUrl = `https://www.hinatazaka46.com/s/official/diary/member/list?page=${page}`;
	const body = await rp(baseUrl);

	return _.map(
		dparser
			.parseFromString(body, 'text/html')
			.querySelectorAll('.p-blog-article'),
		($article) => {
			const $content = $article.querySelector('.c-blog-article__text');

			return new Article({
				date: dayjs(
					$article.querySelector('.c-blog-article__date').innerText
				),
				title: $article
					.querySelector('.c-blog-article__title')
					.innerText.trim(),
				author: $article
					.querySelector('.c-blog-article__name')
					.innerText.replace(/\s/g, ''),
				html: convertHtmlToHtmlString($content),
				content: $content.innerText,
				url: liburl.resolve(
					baseUrl,
					$article.querySelector('.c-button-blog-detail').pathname
				)
			});
		}
	);
};

class Anyzaka {
	constructor() {
		_.find(anyzakaJSON, { name: '乃木坂46' }).fetcher = {
			fetch: fetchNogi
		};
		_.find(anyzakaJSON, { name: '欅坂46' }).fetcher = {
			fetch: fetchKeyaki
		};
		_.find(anyzakaJSON, { name: '日向坂46' }).fetcher = {
			fetch: fetchHinata
		};

		this.entries = anyzakaJSON;
	}

	/**
	 * @param {{}} extraBlogsJson
	 */
	async addExtraBlogs(extraBlogsJson) {
		let { entries } = this;
		const extraBlogs = {};
		const dic = {
			line: {
				name: 'LINE BLOG',
				color: 'rgb(90, 196, 127)',
				fetcher: lineblog,
				page: 1
			},
			ameblo: {
				name: 'Ameba Blog',
				color: 'rgb(45, 140, 60)',
				fetcher: ameblo,
				page: 1
			}
		};

		for (const key of _.keys(extraBlogsJson)) {
			if (!_.has(extraBlogs, key)) {
				extraBlogs[key] = _.merge(
					{
						_ids: [],
						_key: key,
						_optionsList: [],
						members: [],
						extra: true
					},
					dic[key]
				);

				for (let value of extraBlogsJson[key]) {
					if (typeof value === 'string') {
						value = [value, { pages: 1 }];
					}

					const [id, options] = value;
					const { url, name } = await dic[
						key
					].fetcher.idToImageUrlAndName(id);

					await fs.writeFile(
						libpath.join(EXTRA_ICONS_DIR, `${name}.jpg`),
						await rp(url, { encoding: null })
					);

					extraBlogs[key]._optionsList.push(options);
					extraBlogs[key]._ids.push(id);
					extraBlogs[key].members.push(name);
				}
			}
		}

		_.forEach(_.values(extraBlogs), (blogs) => {
			entries = _.filter(entries, ({ name }) => name !== blogs.name);
			entries.push(blogs);
		});

		this.entries = entries;
	}

	getGroupColorFromMember(name) {
		const { entries } = this;
		let ret = null;

		for (const { members, color } of entries) {
			if (_.includes(members, name)) {
				ret = color;
				break;
			}
		}

		return ret;
	}

	/**
	 * @param {string} name
	 */
	toMemberIconPath(name) {
		const { entries } = this;
		let path = libpath.join(ICONS_DIR, 'fallback.png');

		for (const { members, extra } of entries) {
			if (_.includes(members, name)) {
				path = libpath.join(
					extra ? EXTRA_ICONS_DIR : ICONS_DIR,
					`${name}.jpg`
				);
				break;
			}
		}

		return path;
	}
}

export default new Anyzaka();

import anyzakaJSON from './assets/anyzaka.json';
import _ from 'lodash';
import { ICONS_DIR, EXTRA_ICONS_DIR } from './config';
import libpath from 'path';
import rp from 'request-promise';
import Article from './models/Article';
import { convertHtmlToHtmlString } from './util';
import liburl from 'url';
import dayjs from 'dayjs';
import LineBlog from './lineblog';
import Ameblo from './ameblo';
import fs from 'fs-extra';
import { Record, fromJS } from 'immutable';

const dparser = new DOMParser();

export class Nogi {
	static parse(body) {
		const $parsed = dparser.parseFromString(body, 'text/html');
		const names = $parsed.querySelectorAll('.author');
		const titles = $parsed.querySelectorAll('h1 .entrytitle');
		const contents = $parsed.querySelectorAll('.entrybody');
		const dates = $parsed.querySelectorAll('.entrybottom');
		const urls = $parsed.querySelectorAll(
			'#siderecententry .inner li:not(.last) a'
		);
		const { length } = dates;
		const ret = [];

		for (let i = 0; i < length; i += 1) {
			const $content = contents[i];

			ret.push({
				date: dayjs(dates[i].childNodes[0].nodeValue.slice(0, -1)),
				title: titles[i].innerText,
				author: names[i].innerText.replace(/\s/g, ''),
				html: convertHtmlToHtmlString($content),
				content: $content.innerText,
				url: (urls[i] ? urls[i] : titles[i].querySelector('a')).href
			});
		}

		return ret;
	}

	static async fetch(entry) {
		return _.map(
			Nogi.parse(
				await rp(`http://blog.nogizaka46.com/?p=${entry.get('page')}`)
			),
			(a) => new Article(a)
		);
	}
}

const fetchKeyaki = async (entry) => {
	const baseUrl = `http://www.keyakizaka46.com/s/k46o/diary/member/list?page=${entry.get(
		'page'
	)}`;
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

const fetchHinata = async (entry) => {
	const baseUrl = `https://www.hinatazaka46.com/s/official/diary/member/list?page=${entry.get(
		'page'
	)}`;
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

_.find(anyzakaJSON, { name: '乃木坂46' })._fetcher = Nogi;
_.find(anyzakaJSON, { name: '欅坂46' }).fetch = fetchKeyaki;
_.find(anyzakaJSON, { name: '日向坂46' }).fetch = fetchHinata;

export default class Anyzaka extends Record({ slopes: fromJS(anyzakaJSON) }) {
	static async convertExtraBlogs(extraBlogsJson) {
		const extraBlogs = {};
		const dic = {
			line: {
				name: 'LINE BLOG',
				color: 'rgb(90, 196, 127)',
				_fetcher: LineBlog,
				page: 1
			},
			ameblo: {
				name: 'Ameba Blog',
				color: 'rgb(45, 140, 60)',
				_fetcher: Ameblo,
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
						value = [value, {}];
					}

					const [id, options] = value;
					const { url, name } = await dic[
						key
					]._fetcher.idToImageUrlAndName(id);

					await fs.writeFile(
						libpath.join(EXTRA_ICONS_DIR, `${name}.jpg`),
						await rp(url, { encoding: null })
					);

					extraBlogs[key]._optionsList.push(
						_.update(
							_.merge({ multi: 1, filters: [] }, options),
							'filters',
							(filters) => {
								return _.map(filters, ([a, b]) => [
									a,
									new RegExp(b)
								]);
							}
						)
					);
					extraBlogs[key]._ids.push(id);
					extraBlogs[key].members.push(name);
				}
			}
		}

		return fromJS(_.values(extraBlogs));
	}

	/**
	 * @param {{}} extraBlogs
	 */
	addExtraBlogs(extraBlogs) {
		let { slopes } = this;

		extraBlogs.forEach((blogs) => {
			slopes = slopes
				.filter((a) => a.get('name') !== blogs.get('name'))
				.push(blogs);
		});

		return this.set('slopes', slopes);
	}

	getGroupColorFromMember(name) {
		const { slopes } = this;
		const { size } = slopes;
		let ret = null;

		for (let i = 0; i < size; i += 1) {
			const slope = slopes.get(i);

			if (slope.get('members').includes(name)) {
				ret = slope.get('color');
				break;
			}
		}

		return ret;
	}

	/**
	 * @param {string} name
	 */
	toMemberIconPath(name) {
		const { slopes } = this;
		const { size } = slopes;
		let path = libpath.join(ICONS_DIR, 'fallback.png');

		for (let i = 0; i < size; i += 1) {
			const slope = slopes.get(i);

			if (slope.get('members').includes(name)) {
				path = libpath.join(
					slope.get('extra') ? EXTRA_ICONS_DIR : ICONS_DIR,
					`${name}.jpg`
				);
				break;
			}
		}

		return path;
	}
}

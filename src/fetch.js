import _ from 'lodash';
import rp from 'request-promise';
import Article from './models/Article';
import anyzaka from './anyzaka';
import { convertHtmlToHtmlString } from './util';
import liburl from 'url';
import dayjs from 'dayjs';

const dparser = new DOMParser();

const otherBlogFetcher = async ({ _fetcher, _ids, _optionsList }, page) => {
	const ret = [];
	const { length } = _ids;

	for (let i = 0; i < length; i += 1) {
		ret.push(...(await _fetcher.fetch(_ids[i], page, _optionsList[i])));
	}

	return ret;
};

const fetchNogi = async (page = 0) => {
	const body = await rp(`http://blog.nogizaka46.com/?p=${page + 1}`);
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

const fetchKeyaki = async (page = 0) => {
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

const fetchHinata = async (page = 0) => {
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

export default async (page = 0) => {
	const blogs = [
		...(await fetchKeyaki(page)),
		...(await fetchNogi(page)),
		...(await fetchHinata(page))
	];

	for (const entry of anyzaka.entries) {
		if (_.has(entry, '_fetcher')) {
			blogs.push(...(await otherBlogFetcher(entry, page)));
		}
	}

	return blogs;
};

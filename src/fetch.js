import _ from 'lodash';
import rp from 'request-promise';
import Article from './models/Article';
import anyzaka from './anyzaka';
import { convertHtmlToHtmlString } from './util';
import lineblog from './lineblog';
import liburl from 'url';

const dparser = new DOMParser();

export const getLineBlogUrl = (id) => {
	return `https://lineblog.me/${id}`;
};

const otherBlogFetcher = {
	fetchLineBlog: async ({ _ids }, page = 0) => {
		const ret = [];

		for (const id of _ids) {
			ret.push(...(await lineblog.fetch(id, page)));
		}

		return ret;
	}
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
		ret.push(
			new Article({
				date: new Date(dates[i].childNodes[0].nodeValue.slice(0, -1)),
				title: titles[i].innerText,
				name: names[i].innerText.replace(/\s/g, ''),
				content: convertHtmlToHtmlString(contents[i]),
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

			return new Article({
				date: new Date(datestr),
				title: $title.innerText.trim(),
				name: name.replace(/\s/g, ''),
				content: convertHtmlToHtmlString(
					$article.querySelector('.box-article')
				),
				url: liburl.resolve(baseUrl, $title.pathname)
			});
		}
	);
};

export default async (page = 0) => {
	const blogs = [...(await fetchKeyaki(page)), ...(await fetchNogi(page))];

	for (const entry of anyzaka.entries) {
		if (_.has(entry, '_fetcher')) {
			blogs.push(
				...(await otherBlogFetcher[entry['_fetcher']](entry, page))
			);
		}
	}

	return blogs;
};

import _ from 'lodash';
import rp from 'request-promise';
import Article from './models/Article';
import anyzaka from './anyzaka';
import { convertHtmlToHtmlString } from './util';
import lineblog from './lineblog';

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
	const titles = $parsed.querySelectorAll('h1 .entrytitle');
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
				content: convertHtmlToHtmlString(contents[i])
			})
		);
	}

	return ret;
};

const fetchKeyaki = async (page = 0) => {
	const body = await rp(
		`http://www.keyakizaka46.com/s/k46o/diary/member/list?page=${page}`
	);

	return _.map(
		dparser.parseFromString(body, 'text/html').querySelectorAll('article'),
		($article) => {
			const { innerText: datestr } = $article.querySelector(
				'.box-bottom li'
			);
			const { innerText: title } = $article.querySelector('h3');
			const { innerText: name } = $article.querySelector('.name');

			return new Article({
				date: new Date(datestr),
				title: title.trim(),
				name: name.replace(/\s/g, ''),
				content: convertHtmlToHtmlString(
					$article.querySelector('.box-article')
				)
			});
		}
	);
};

export default async (page = 0) => {
	const blogs = [...(await fetchKeyaki(page)), ...(await fetchNogi(page))];

	for (const other of anyzaka.json()) {
		if (_.has(other, '_fetcher')) {
			blogs.push(
				...(await otherBlogFetcher[other['_fetcher']](other, page))
			);
		}
	}

	return _.sortBy(blogs, ({ date }) => -date);
};

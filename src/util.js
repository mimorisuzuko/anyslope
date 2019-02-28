import _ from 'lodash';
import TurndownService from 'turndown';
import anyzakaJSON from './assets/anyzaka.json';

const dparser = new DOMParser();
const turndownService = new TurndownService();

/**
 * @param {string} url
 */
const request = async (url) => {
	return await fetch(url)
		.then((res) => {
			const { ok } = res;

			if (ok) {
				return res;
			} else {
				throw new Error(res);
			}
		})
		.then((r) => r.text());
};

export const fetchAll = async (page = 0) => {
	return _.sortBy(
		_.concat(await fetchKeyaki(page), await fetchNogi(page)),
		({ date }) => date
	);
};

/**
 * @param {number} page
 */
export const fetchNogi = async (page) => {
	const body = await request(`http://localhost:46001/nogi?page=${page + 1}`);
	const $parsed = dparser.parseFromString(body, 'text/html');
	const names = $parsed.querySelectorAll('.author');
	const titles = $parsed.querySelectorAll('h1 .entrytitle');
	const contents = $parsed.querySelectorAll('.entrybody');
	const dates = $parsed.querySelectorAll('.entrybottom');
	const { length } = dates;
	const ret = [];

	for (let i = 0; i < length; i += 1) {
		ret.push({
			date: new Date(dates[i].childNodes[0].nodeValue.slice(0, -1)),
			title: titles[i].innerText,
			name: names[i].innerText.replace(/\s/g, ''),
			content: turndownService.turndown(contents[i].innerHTML).trim()
		});
	}

	return ret;
};

/**
 * @param {number} page
 */
export const fetchKeyaki = async (page) => {
	const body = await request(`http://localhost:46001/keyaki?page=${page}`);

	return _.map(
		dparser.parseFromString(body, 'text/html').querySelectorAll('article'),
		($article) => {
			const { innerText: datestr } = $article.querySelector(
				'.box-bottom li'
			);
			const { innerText: title } = $article.querySelector('h3');
			const { innerText: name } = $article.querySelector('.name');

			return {
				date: new Date(datestr),
				title: title.trim(),
				name: name.replace(/\s/g, ''),
				content: turndownService
					.turndown($article.querySelector('.box-article').innerHTML)
					.trim()
			};
		}
	);
};

class Anyzaka {
	json() {
		return anyzakaJSON;
	}

	getGroupColorFromMember(name) {
		let ret = null;

		_.forEach(anyzakaJSON, ({ members, color }) => {
			if (_.includes(members, name)) {
				ret = color;
			}
		});

		return ret;
	}

	/**
	 * @param {string} name
	 */
	toMemberIconPath(name) {
		return `assets/icons/${name}.jpg`;
	}
}

export const anyzaka = new Anyzaka();

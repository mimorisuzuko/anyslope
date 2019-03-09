import _ from 'lodash';
import TurndownService from 'turndown';
import anyzakaJSON from './assets/anyzaka.json';
import rp from 'request-promise';
import marked from 'marked';
import Article from './models/Article';

const dparser = new DOMParser();
const turndownService = new TurndownService();

/**
 * @param {Element} $html
 * @returns {string}
 */
const convertHtmlToHtmlString = ($html) => {
	return marked(turndownService.turndown($html.innerHTML).trim());
};

export const fetchAll = async (page = 0) => {
	return _.sortBy(
		_.concat(await fetchKeyaki(page), await fetchNogi(page)),
		({ date }) => -date
	);
};

export const fetchNogi = async (page = 0) => {
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

export const fetchKeyaki = async (page = 0) => {
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

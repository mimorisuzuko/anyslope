import _ from 'lodash';
import TurndownService from 'turndown';
import anyzakaJSON from './assets/anyzaka.json';

const dparser = new DOMParser();
const turndownService = new TurndownService();

export const fetchKeyaki = async (page = 0) => {
	const body = await fetch(`http://localhost:46001/all?page=${page}`)
		.then((res) => {
			const { ok } = res;

			if (ok) {
				return res;
			} else {
				throw new Error(res);
			}
		})
		.then((r) => r.text());

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
				name: name.trim(),
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

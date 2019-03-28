import urljoin from 'url-join';
import rp from 'request-promise';
import { convertHtmlToHtmlString } from './util';
import Article from './models/Article';
import _ from 'lodash';

const dparser = new DOMParser();

class LineBlog {
	constructor() {}

	/**
	 * @param {string}
	 */
	getURL(id) {
		return `https://lineblog.me/${id}`;
	}

	async idToImageUrlAndName(id) {
		const body = await rp(this.getURL(id));
		const $parsed = dparser.parseFromString(body, 'text/html');

		return {
			name: $parsed.querySelector('h2').innerText,
			url: $parsed.querySelector('.profile-photo-thumbnail img').src
		};
	}

	async fetch(id, page = 0) {
		const body = await rp(urljoin(this.getURL(id), `?p=${page + 1}`));
		const $parsed = dparser.parseFromString(body, 'text/html');

		return _.map($parsed.querySelectorAll('.article'), ($article) => {
			const $title = $article.querySelector('.article-title a');
			let $content = $article.querySelector('.article-body');

			_.forEach($content.querySelectorAll('.lineemoji'), ($emoji) => {
				$emoji.alt = 'lineemoji';
			});

			return new Article({
				date: new Date(
					$article.querySelector('.article-date').innerText
				),
				title: $title.innerText,
				name: $parsed.querySelector('h2').innerText,
				content: convertHtmlToHtmlString($content).replace(
					/<img\s+src="(https:\/\/parts\.lineblog\.me\/img\/emoji\/line\/\d+\/\d+\.png)"\s+alt="lineemoji">/g,
					(match, p1) => {
						return `<img src="${p1}" style="width:1.3em;height:1.3em;position:relative;top:0.2em;" alt="lineemoji">`;
					}
				),
				url: $title.href
			});
		});
	}
}

export default new LineBlog();

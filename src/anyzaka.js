import anyzakaJSON from './assets/anyzaka.json';
import _ from 'lodash';

class Anyzaka {
	static get converter() {
		return {
			line: ({ ids, members }) => {
				return {
					name: 'LINE BLOG',
					color: 'rgb(90, 196, 127)',
					_fetcher: 'fetchLineBlog',
					_ids: ids,
					members
				};
			}
		};
	}

	constructor() {
		this.entries = anyzakaJSON;
	}

	/**
	 * @param {{}} otherBlogs
	 */
	addOtherBlogs(otherBlogs) {
		let { entries } = this;

		_.forEach(_.keys(otherBlogs), (key) => {
			const blogs = Anyzaka.converter[key](otherBlogs[key]);

			entries = _.filter(entries, ({ name }) => name !== blogs.name);
			entries.push(blogs);
		});

		this.entries = entries;
	}

	getGroupColorFromMember(name) {
		const { entries } = this;
		let ret = null;

		_.forEach(entries, ({ members, color }) => {
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

	/**
	 * @param {string} name
	 */
	toExtraIconPath(name) {
		return `assets/icons/extras/${name}.jpg`;
	}
}

export default new Anyzaka();

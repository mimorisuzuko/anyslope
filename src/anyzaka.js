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
		this._json = anyzakaJSON;
	}

	json() {
		const { _json } = this;

		return _json;
	}

	/**
	 * @param {{}} otherBlogs
	 */
	addOtherBlogs(otherBlogs) {
		let { _json } = this;

		_.forEach(_.keys(otherBlogs), (key) => {
			const blogs = Anyzaka.converter[key](otherBlogs[key]);

			_json = _.filter(_json, ({ name }) => name !== blogs.name);
			_json.push(blogs);
		});

		this._json = _json;
	}

	getGroupColorFromMember(name) {
		const { _json } = this;
		let ret = null;

		_.forEach(_json, ({ members, color }) => {
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

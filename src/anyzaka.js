import anyzakaJSON from './assets/anyzaka.json';
import _ from 'lodash';

class Anyzaka {
	constructor() {
		this.entries = anyzakaJSON;
	}

	/**
	 * @param {{}} otherBlogs
	 */
	addOtherBlogs(otherBlogs) {
		let { entries } = this;

		_.forEach(_.values(otherBlogs), (blogs) => {
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

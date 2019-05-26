import anyzakaJSON from './assets/anyzaka.json';
import _ from 'lodash';
import { ICONS_DIR, EXTRA_ICONS_DIR } from './config';
import libpath from 'path';

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
		const { entries } = this;
		let path = libpath.join(ICONS_DIR, 'fallback.png');

		_.some(entries, ({ members, extra }) => {
			if (_.includes(members, name)) {
				path = libpath.join(
					extra ? EXTRA_ICONS_DIR : ICONS_DIR,
					`${name}.jpg`
				);

				return true;
			}

			return false;
		});

		return path;
	}
}

export default new Anyzaka();

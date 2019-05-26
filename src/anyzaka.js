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

		for (const { members, color } of entries) {
			if (_.includes(members, name)) {
				ret = color;
				break;
			}
		}

		return ret;
	}

	/**
	 * @param {string} name
	 */
	toMemberIconPath(name) {
		const { entries } = this;
		let path = libpath.join(ICONS_DIR, 'fallback.png');

		for (const { members, extra } of entries) {
			if (_.includes(members, name)) {
				path = libpath.join(
					extra ? EXTRA_ICONS_DIR : ICONS_DIR,
					`${name}.jpg`
				);
				break;
			}
		}

		return path;
	}
}

export default new Anyzaka();

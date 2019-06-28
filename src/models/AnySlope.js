import anySlopeJson from './anyslope.json';
import _ from 'lodash';
import { ICONS_DIR, EXTRA_ICONS_DIR } from '../config';
import libpath from 'path';
import rp from 'request-promise';
import fs from 'fs-extra';
import { Record, fromJS } from 'immutable';
import * as fetchers from '../fetchers';

export default class AnySlope extends Record({ slopes: fromJS(anySlopeJson) }) {
	static async convertExtraBlogs(extraBlogsJson) {
		const extraBlogs = {};
		const dic = {
			line: {
				name: 'LINE BLOG',
				color: 'rgb(90, 196, 127)',
				fetcher: 'LineBlog',
				page: 1
			},
			ameblo: {
				name: 'Ameba Blog',
				color: 'rgb(45, 140, 60)',
				fetcher: 'Ameblo',
				page: 1
			}
		};

		for (const key of _.keys(extraBlogsJson)) {
			if (!_.has(extraBlogs, key)) {
				extraBlogs[key] = _.merge(
					{
						_ids: [],
						_key: key,
						_optionsList: [],
						members: [],
						extra: true
					},
					dic[key]
				);

				for (let value of extraBlogsJson[key]) {
					if (typeof value === 'string') {
						value = [value, {}];
					}

					const [id, options] = value;
					const { url, name } = await fetchers[
						dic[key].fetcher
					].idToImageUrlAndName(id);

					await fs.writeFile(
						libpath.join(EXTRA_ICONS_DIR, `${name}.jpg`),
						await rp(url, { encoding: null })
					);

					extraBlogs[key]._optionsList.push(
						_.update(
							_.merge({ multi: 1, filters: [] }, options),
							'filters',
							(filters) => {
								return _.map(filters, ([a, b]) => [
									a,
									new RegExp(b)
								]);
							}
						)
					);
					extraBlogs[key]._ids.push(id);
					extraBlogs[key].members.push(name);
				}
			}
		}

		return fromJS(_.values(extraBlogs));
	}

	/**
	 * @param {{}} extraBlogs
	 */
	addExtraBlogs(extraBlogs) {
		let { slopes } = this;

		extraBlogs.forEach((blogs) => {
			slopes = slopes
				.filter((a) => a.get('name') !== blogs.get('name'))
				.push(blogs);
		});

		return this.set('slopes', slopes);
	}

	getGroupColorFromMember(name) {
		const { slopes } = this;
		const { size } = slopes;
		let ret = null;

		for (let i = 0; i < size; i += 1) {
			const slope = slopes.get(i);

			if (slope.get('members').includes(name)) {
				ret = slope.get('color');
				break;
			}
		}

		return ret;
	}

	/**
	 * @param {string} name
	 */
	toMemberIconPath(name) {
		const { slopes } = this;
		const { size } = slopes;
		let path = libpath.join(ICONS_DIR, 'fallback.png');

		for (let i = 0; i < size; i += 1) {
			const slope = slopes.get(i);

			if (slope.get('members').includes(name)) {
				path = libpath.join(
					slope.get('extra') ? EXTRA_ICONS_DIR : ICONS_DIR,
					`${name}.jpg`
				);
				break;
			}
		}

		return path;
	}
}

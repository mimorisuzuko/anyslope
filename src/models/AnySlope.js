import _ from 'lodash';
import { ICONS_DIR, EXTRA_ICONS_DIR } from '../config';
import libpath from 'path';
import rp from 'request-promise';
import fs from 'fs-extra';
import { Record, List } from 'immutable';
import * as fetchers from '../fetchers';

export default class AnySlope extends Record({ slopes: List() }) {
    static async mergeExtraBlogs(json, extraBlogsJson) {
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
                    const { body, headers } = await rp({
                        url,
                        encoding: null,
                        resolveWithFullResponse: true
                    });

                    await fs.writeFile(
                        libpath.join(EXTRA_ICONS_DIR, `${name}.jpg`),
                        body
                    );

                    extraBlogs[key]._optionsList.push(
                        _.merge({ multi: 1, filters: [] }, options)
                    );
                    extraBlogs[key]._ids.push(id);
                    extraBlogs[key].members.push({
                        name,
                        lastModified: headers['last-modified']
                    });
                }
            }
        }

        _.forEach(_.values(extraBlogs), (extraBlog) => {
            json = _.filter(json, ({ name }) => name !== extraBlog);
            json.push(extraBlog);
        });

        return json;
    }

    getGroupColorFromMember(name) {
        const { slopes } = this;
        const { size } = slopes;
        let ret = null;

        for (let i = 0; i < size; i += 1) {
            const slope = slopes.get(i);
            const exist = slope
                .get('members')
                .find((a) => a.get('name') === name);

            if (exist) {
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
            const exist = slope
                .get('members')
                .find((a) => a.get('name') === name);

            if (exist) {
                const temp = libpath.join(
                    slope.get('extra') ? EXTRA_ICONS_DIR : ICONS_DIR,
                    `${name}.jpg`
                );

                if (fs.existsSync(temp)) {
                    path = temp;
                }

                break;
            }
        }

        return path;
    }
}

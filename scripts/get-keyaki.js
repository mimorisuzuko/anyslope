#!./node_modules/.bin/babel-node

import fs from 'fs-extra';
import rp from 'request-promise';
import libpath from 'path';
import _ from 'lodash';
import { ICONS_DIR, ANY_SLOPE_DEFAULT_VALUE_PATH } from '../src/config';
import { JSDOM } from 'jsdom';

(async () => {
    const {
        window: { document }
    } = new JSDOM(await rp('http://www.keyakizaka46.com/s/k46o/search/artist'));
    const members = [];
    const es = document.querySelectorAll(
        '.sorted.sort-default.current > .box-member'
    );

    for (let i = 0; i < 2; i += 1) {
        for (const $li of es[i].querySelectorAll('li')) {
            const name = $li
                .querySelector('.name')
                .textContent.replace(/\s/g, '');
            const { body, headers } = await rp({
                url: $li.querySelector('img').src,
                encoding: null,
                resolveWithFullResponse: true
            });

            await fs.writeFile(
                libpath.join(ICONS_DIR, `${name}.jpg`),
                body,
                'binary'
            );

            members.push({
                name,
                lastModified: headers['last-modified']
            });
        }
    }

    const anyzaka = await fs.readJSON(ANY_SLOPE_DEFAULT_VALUE_PATH);

    await fs.writeJSON(
        ANY_SLOPE_DEFAULT_VALUE_PATH,
        _.concat(
            _.filter(anyzaka, ({ name }) => name !== '欅坂46'),
            {
                name: '欅坂46',
                color: 'rgb(84, 176, 74)',
                members,
                extra: false,
                page: 0,
                fetcher: 'Keyaki'
            }
        )
    );
})().catch(console.error);

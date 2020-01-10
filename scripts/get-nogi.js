#!./node_modules/.bin/babel-node

import fs from 'fs-extra';
import rp from 'request-promise';
import libpath from 'path';
import _ from 'lodash';
import { ICONS_DIR, ANY_SLOPE_DEFAULT_VALUE_PATH } from '../src/config';
import { JSDOM } from 'jsdom';
import urlJoin from 'url-join';

(async () => {
    const baseUrl = 'http://www.nogizaka46.com/member/';
    const {
        window: { document }
    } = new JSDOM(await rp(baseUrl));
    const members = [];

    for (const $unit of document.querySelectorAll('.unit')) {
        const {
            window: { document }
        } = new JSDOM(
            await rp(urlJoin(baseUrl, $unit.querySelector('a').href))
        );
        const name = document
            .querySelector('h2')
            .childNodes[1].nodeValue.replace(/\s/g, '');
        const { body, headers } = await rp({
            url: document.getElementById('profile').querySelector('img').src,
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

    const anyzaka = await fs.readJSON(ANY_SLOPE_DEFAULT_VALUE_PATH);

    await fs.writeJSON(
        ANY_SLOPE_DEFAULT_VALUE_PATH,
        _.concat(
            _.filter(anyzaka, ({ name }) => name !== '乃木坂46'),
            {
                name: '乃木坂46',
                color: 'rgb(118, 37, 133)',
                members: [
                    ...members,
                    { name: '運営スタッフ', lastModified: 0 },
                    { name: '４期生', lastModified: 0 }
                ],
                extra: false,
                page: 1,
                fetcher: 'Nogi'
            }
        )
    );
})().catch(console.error);

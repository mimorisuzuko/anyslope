#!./node_modules/.bin/babel-node

import fs from 'fs-extra';
import rp from 'request-promise';
import libpath from 'path';
import _ from 'lodash';
import { ICONS_DIR, ANY_SLOPE_DEFAULT_VALUE_PATH } from '../src/config';
import { JSDOM } from 'jsdom';
import urlJoin from 'url-join';

(async () => {
    const baseUrl = 'http://blog.nogizaka46.com/';
    const {
        window: { document }
    } = new JSDOM(await rp(baseUrl));
    const members = [];

    for (const $unit of document
        .getElementById('sidemember')
        .querySelectorAll('.unit')) {
        const { alt: name } = $unit.querySelector('img');
        const { body, headers } = await rp({
            url: new JSDOM(
                await rp(urlJoin(baseUrl, $unit.querySelector('a').href))
            ).window.document
                .getElementById('sideprofile')
                .querySelector('img').src,
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
                    { name: '運営スタッフ', lastModified: 0 }
                ],
                extra: false,
                page: 1,
                fetcher: 'Nogi'
            }
        )
    );
})().catch(console.error);

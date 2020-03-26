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
    } = new JSDOM(
        await rp('https://www.hinatazaka46.com/s/official/search/artist')
    );
    const members = await Promise.all(
        _.map(
            document.querySelectorAll(
                '.sorted.sort-default.current .p-member__item'
            ),
            async ($item) => {
                const name = $item
                    .querySelector('.c-member__name')
                    .textContent.replace(/\s/g, '');
                const { body, headers } = await rp({
                    url: $item.querySelector('img').src,
                    encoding: null,
                    resolveWithFullResponse: true
                });

                await fs.writeFile(
                    libpath.join(ICONS_DIR, `${name}.jpg`),
                    body,
                    'binary'
                );

                return {
                    name,
                    lastModified: headers['last-modified']
                };
            }
        )
    );
    const anyzaka = await fs.readJSON(ANY_SLOPE_DEFAULT_VALUE_PATH);

    await fs.writeJSON(
        ANY_SLOPE_DEFAULT_VALUE_PATH,
        _.concat(
            _.filter(anyzaka, ({ name }) => name !== '日向坂46'),
            {
                name: '日向坂46',
                color: 'rgb(81, 182, 224)',
                members,
                extra: false,
                page: 0,
                fetcher: 'Hinata'
            }
        )
    );
})().catch(console.error);

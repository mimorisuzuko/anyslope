#!./node_modules/.bin/babel-node

import fs from 'fs-extra';
import rp from 'request-promise';
import puppeteer from 'puppeteer';
import libpath from 'path';
import _ from 'lodash';
import { ICONS_DIR, ANY_SLOPE_DEFAULT_VALUE_PATH } from '../src/config';

(async () => {
    const browser = await puppeteer.launch({
        args: ['--lang=ja,en-US,en']
    });
    const page = await browser.newPage();

    await page.goto('https://www.hinatazaka46.com/s/official/search/artist');
    const members = await page.evaluate(() => {
        return Array.from(
            document.querySelectorAll(
                '.sorted.sort-default.current .p-member__item'
            ),
            ($item) => {
                return [
                    $item.querySelector('img').src,
                    $item
                        .querySelector('.c-member__name')
                        .innerText.replace(/\s/g, '')
                ];
            }
        );
    });

    const anyzaka = await fs.readJSON(ANY_SLOPE_DEFAULT_VALUE_PATH);

    await fs.writeJSON(
        ANY_SLOPE_DEFAULT_VALUE_PATH,
        _.concat(
            _.filter(anyzaka, ({ name }) => name !== '日向坂46'),
            {
                name: '日向坂46',
                color: 'rgb(81, 182, 224)',
                members: await Promise.all(
                    _.map(members, async ([url, name]) => {
                        const { body, headers } = await rp({
                            url,
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
                    })
                ),
                extra: false,
                page: 0,
                fetcher: 'Hinata'
            }
        )
    );

    browser.close();
})().catch(console.error);

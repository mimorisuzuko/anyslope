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

    await page.goto('http://www.keyakizaka46.com/s/k46o/search/artist');
    const members = await page.evaluate(() => {
        const ret = [];
        const es = document.querySelectorAll(
            '.sorted.sort-default.current > .box-member'
        );

        for (let i = 0; i < 2; i += 1) {
            for (const $li of es[i].querySelectorAll('li')) {
                ret.push([
                    $li.querySelector('img').src,
                    $li.querySelector('.name').innerText.replace(/\s/g, '')
                ]);
            }
        }

        return ret;
    });

    const anyzaka = await fs.readJSON(ANY_SLOPE_DEFAULT_VALUE_PATH);

    await fs.writeJSON(
        ANY_SLOPE_DEFAULT_VALUE_PATH,
        _.concat(
            _.filter(anyzaka, ({ name }) => name !== '欅坂46'),
            {
                name: '欅坂46',
                color: 'rgb(84, 176, 74)',
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
                fetcher: 'Keyaki'
            }
        )
    );

    browser.close();
})().catch(console.error);

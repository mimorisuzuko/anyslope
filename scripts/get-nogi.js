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
    const members = [];

    await page.goto('http://www.nogizaka46.com/member/');
    for (const href of await page.evaluate(() => {
        return Array.from(document.querySelectorAll('.unit'), ($unit) => {
            const { href } = $unit.querySelector('a');

            return href;
        });
    })) {
        await page.goto(href);
        members.push(
            await page.evaluate(() => {
                const { childNodes } = document.querySelector('h2');
                const { nodeValue } = childNodes[1];
                const { src } = document
                    .getElementById('profile')
                    .querySelector('img');

                return [src, nodeValue.replace(/\s/g, '')];
            })
        );
    }

    const anyzaka = await fs.readJSON(ANY_SLOPE_DEFAULT_VALUE_PATH);

    await fs.writeJSON(
        ANY_SLOPE_DEFAULT_VALUE_PATH,
        _.concat(
            _.filter(anyzaka, ({ name }) => name !== '乃木坂46'),
            {
                name: '乃木坂46',
                color: 'rgb(118, 37, 133)',
                members: _.concat(
                    await Promise.all(
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
                    { name: '運営スタッフ', lastModified: 0 },
                    { name: '４期生', lastModified: 0 }
                ),
                extra: false,
                page: 1,
                fetcher: 'Nogi'
            }
        )
    );

    browser.close();
})().catch(console.error);

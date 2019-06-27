#!./node_modules/.bin/babel-node

import fs from 'fs-extra';
import rp from 'request-promise';
import puppeteer from 'puppeteer';
import libpath from 'path';
import _ from 'lodash';
import { ICONS_DIR } from '../src/config';

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

	for (const [url, name] of members) {
		await fs.writeFile(
			libpath.join(ICONS_DIR, `${name}.jpg`),
			await rp({ method: 'GET', url, encoding: null }),
			'binary'
		);
	}

	const anyzakaPath = libpath.join(__dirname, '../src/assets/anyzaka.json');
	const anyzaka = await fs.readJSON(anyzakaPath);

	await fs.writeJSON(
		anyzakaPath,
		_.concat(_.filter(anyzaka, ({ name }) => name !== '乃木坂46'), {
			name: '乃木坂46',
			color: 'rgb(118, 37, 133)',
			members: _.concat(
				_.map(members, ([, a]) => a),
				'運営スタッフ',
				'４期生'
			),
			extra: false,
			page: 1,
			fetcher: 'Nogi'
		})
	);

	browser.close();
})().catch(console.error);

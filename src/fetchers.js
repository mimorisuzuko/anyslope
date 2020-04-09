import _ from 'lodash';
import rp from 'request-promise';
import Article from './models/Article';
import { convertHtmlToHtmlString } from './util';
import liburl from 'url';
import dayjs from 'dayjs';
import urljoin from 'url-join';
import { renderToStaticMarkup } from 'react-dom/server';
import { renderTweetCard, renderInstgramCard, ogpCard } from './util';
import React from 'react';
import uuid from 'uuid/v4';

const dparser = new DOMParser();

export class Ameblo {
    static get BASE_URL() {
        return 'https://ameblo.jp';
    }

    /**
     * @param {string}
     */
    static getURL(id) {
        return urljoin(Ameblo.BASE_URL, id);
    }

    static parse(body) {
        const $parsed = dparser.parseFromString(body, 'text/html');
        const ret = [];
        const {
            bloggerState: { bloggerMap },
            entryState: { entryMap }
        } = JSON.parse(
            body.match(
                /<script>window.INIT_DATA\s?=\s?(\{.+\});\s?window.RESOURCE_BASE_URL/
            )[1]
        );
        const entries = _.values(entryMap);
        const {
            profile: { nickname }
        } = _.values(bloggerMap)[0];

        _.forEach(
            $parsed.querySelectorAll('.skin-entry.js-entryWrapper'),
            ($article, i) => {
                const $title = $article.querySelector('a.skinArticleTitle');
                const $content = $article.querySelector('.skin-entryBody');

                ret.push({
                    date: dayjs(entries[i].entry_created_datetime),
                    title: $title.innerText,
                    author: nickname,
                    content: $content.innerText,
                    html: convertHtmlToHtmlString($content).replace(
                        /<img\s+src="(https:\/\/stat100.ameba.jp\/blog\/ucs\/img\/char\/\w+\/\w+\.png)">/g,
                        (match, p1) => {
                            return `<img src="${p1}" width="24" width="24" alt="emoji">`;
                        }
                    ),
                    url: urljoin(
                        Ameblo.BASE_URL,
                        ...$title.href.split('/').slice(-2)
                    )
                });
            }
        );

        return ret;
    }

    static async idToImageUrlAndName(id) {
        const body = await rp(Ameblo.getURL(id));

        const {
            bloggerState: { bloggerMap }
        } = JSON.parse(
            body.match(
                /<script>window.INIT_DATA\s?=\s?(\{.+\});\s?window.RESOURCE_BASE_URL/
            )[1]
        );
        const {
            profile: { nickname, image_filepath }
        } = _.values(bloggerMap)[0];

        return { name: nickname, url: image_filepath };
    }

    static async fetch(entry) {
        const ret = [];
        const _ids = entry.get('_ids');
        const { size } = _ids;
        const page = entry.get('page');

        for (let i = 0; i < size; i += 1) {
            const options = entry.getIn(['_optionsList', i]);
            const multi = options.get('multi');
            const filters = options.get('filters');

            for (let j = 0; j < multi; j += 1) {
                ret.push(
                    ..._.map(
                        Ameblo.parse(
                            await rp(
                                urljoin(
                                    Ameblo.getURL(_ids.get(i)),
                                    `/page-${(page - 1) * multi + j + 1}.html`
                                )
                            )
                        ),
                        (origin) => {
                            return new Article({
                                ...origin,
                                filtered: filters.some((filter) => {
                                    return (
                                        origin[filter.get(0)].match(
                                            filter.get(1)
                                        ) === null
                                    );
                                })
                            });
                        }
                    )
                );
            }
        }

        return ret;
    }
}

export class LineBlog {
    /**
     * @param {string}
     */
    static getURL(id) {
        return `https://lineblog.me/${id}`;
    }

    static async idToImageUrlAndName(id) {
        const body = await rp(LineBlog.getURL(id));
        const $parsed = dparser.parseFromString(body, 'text/html');

        return {
            name: $parsed.querySelector('h2').innerText,
            url: $parsed.querySelector('.profile-photo-thumbnail img').src
        };
    }

    static async parse(body) {
        const $parsed = dparser.parseFromString(body, 'text/html');
        const ret = [];

        for (const $article of $parsed.querySelectorAll('.article')) {
            const $title = $article.querySelector('.article-title a');
            const mediaDic = {};
            const $content = $article.querySelector('.article-body');

            for (const $tweet of $content.querySelectorAll('.twitter-tweet')) {
                const key = `_tweet_${uuid()}`;

                mediaDic[key] = renderToStaticMarkup(
                    await renderTweetCard($tweet.children[1].href)
                );
                $tweet.outerHTML = key;
            }

            for (const $instagram of $content.querySelectorAll(
                '.instagram-media'
            )) {
                const key = `_instagram_${uuid()}`;

                mediaDic[key] = renderToStaticMarkup(
                    await renderInstgramCard(
                        $instagram.dataset.instgrmPermalink
                    )
                );
                $instagram.outerHTML = key;
            }

            for (const $video of $content.querySelectorAll('.uploaded-video')) {
                const { src } = $video.querySelector('source');
                const key = `_video_${uuid()}`;

                mediaDic[key] = renderToStaticMarkup(
                    <div>
                        <video controls src={src} />
                    </div>
                );
                $video.outerHTML = key;
            }

            for (const $ogp of $content.querySelectorAll('.ogpLink')) {
                const key = `_ogp_${uuid()}`;

                mediaDic[key] = renderToStaticMarkup(
                    await ogpCard.render($ogp.href)
                );
                $ogp.outerHTML = key;
            }

            for (const $iframe of $content.querySelectorAll('iframe')) {
                $iframe.outerText = renderToStaticMarkup(
                    <div>
                        <iframe
                            width='480'
                            height='270'
                            src={$iframe.src}
                            frameBorder='0'
                            allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
                            allowFullScreen
                        />
                    </div>
                );
            }

            ret.push({
                date: dayjs($article.querySelector('.article-date').innerText),
                title: $title.innerText,
                author: $parsed.querySelector('.profile-photo h2').innerText,
                content: $content.innerText,
                html: convertHtmlToHtmlString($content)
                    .replace(
                        /<img\s+src="(https:\/\/parts\.lineblog\.me\/img\/emoji\/line\/\d+\/\d+\.png)">/g,
                        (match, p1) => {
                            return `<img src="${p1}" style="width:1.3em;height:1.3em;position:relative;top:0.2em;" alt="emoji">`;
                        }
                    )
                    .replace(
                        /(_(video|instagram|tweet|ogp)_[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12})/gi,
                        (match, key) => {
                            return mediaDic[key];
                        }
                    ),
                url: $title.href
            });
        }

        return ret;
    }

    static async fetch(entry) {
        const ret = [];
        const _ids = entry.get('_ids');
        const { size } = _ids;
        const page = entry.get('page');

        for (let i = 0; i < size; i += 1) {
            const options = entry.getIn(['_optionsList', i]);
            const multi = options.get('multi');
            const filters = options.get('filters');

            for (let j = 0; j < multi; j += 1) {
                ret.push(
                    ..._.map(
                        await LineBlog.parse(
                            await rp(
                                urljoin(
                                    LineBlog.getURL(_ids.get(i)),
                                    `?p=${page + (page - 1) * multi + j}`
                                )
                            )
                        ),
                        (a) => {
                            return new Article({
                                ...a,
                                filtered: filters.some((filter) => {
                                    return (
                                        a[filter.get(0)].match(
                                            filter.get(1)
                                        ) === null
                                    );
                                })
                            });
                        }
                    )
                );
            }
        }

        return ret;
    }
}

export class Nogi {
    static parse(body) {
        const $parsed = dparser.parseFromString(body, 'text/html');
        const names = $parsed.querySelectorAll('.author');
        const titles = $parsed.querySelectorAll('h1 .entrytitle');
        const contents = $parsed.querySelectorAll('.entrybody');
        const dates = $parsed.querySelectorAll('.entrybottom');
        const urls = $parsed.querySelectorAll(
            '#siderecententry .inner li:not(.last) a'
        );
        const { length } = dates;
        const ret = [];

        for (let i = 0; i < length; i += 1) {
            const $content = contents[i];

            ret.push({
                date: dayjs(dates[i].childNodes[0].nodeValue.slice(0, -1)),
                title: titles[i].innerText,
                author: names[i].innerText.replace(/\s/g, ''),
                html: convertHtmlToHtmlString($content),
                content: $content.innerText,
                url: (urls[i] ? urls[i] : titles[i].querySelector('a')).href
            });
        }

        return ret;
    }

    static async fetch(entry) {
        return _.map(
            Nogi.parse(
                await rp(`http://blog.nogizaka46.com/?p=${entry.get('page')}`)
            ),
            (a) => new Article(a)
        );
    }
}

export class Keyaki {
    static get BASE_URL() {
        return 'http://www.keyakizaka46.com';
    }

    static parse(body) {
        return _.map(
            dparser
                .parseFromString(body, 'text/html')
                .querySelectorAll('article'),
            ($article) => {
                const { innerText: datestr } = $article.querySelector(
                    '.box-bottom li'
                );
                const $title = $article.querySelector('h3 a');
                const { innerText: name } = $article.querySelector('.name');
                const $content = $article.querySelector('.box-article');

                return {
                    date: dayjs(datestr),
                    title: $title.innerText.trim(),
                    author: name.replace(/\s/g, ''),
                    html: convertHtmlToHtmlString($content),
                    content: $content.innerText,
                    url: liburl.resolve(Keyaki.BASE_URL, $title.pathname)
                };
            }
        );
    }

    static async fetch(entry) {
        return _.map(
            Keyaki.parse(
                await rp(
                    liburl.resolve(
                        Keyaki.BASE_URL,
                        `/s/k46o/diary/member/list?page=${entry.get('page')}`
                    )
                )
            ),
            (a) => new Article(a)
        );
    }
}

export class Hinata {
    static get BASE_URL() {
        return 'https://www.hinatazaka46.com';
    }

    static parse(body) {
        return _.map(
            dparser
                .parseFromString(body, 'text/html')
                .querySelectorAll('.p-blog-article'),
            ($article) => {
                const $content = $article.querySelector(
                    '.c-blog-article__text'
                );

                return {
                    date: dayjs(
                        $article.querySelector('.c-blog-article__date')
                            .innerText
                    ),
                    title: $article
                        .querySelector('.c-blog-article__title')
                        .innerText.trim(),
                    author: $article
                        .querySelector('.c-blog-article__name')
                        .innerText.replace(/\s/g, ''),
                    html: convertHtmlToHtmlString($content),
                    content: $content.innerText,
                    url: liburl.resolve(
                        Hinata.BASE_URL,
                        $article.querySelector('.c-button-blog-detail').pathname
                    )
                };
            }
        );
    }

    static async fetch(entry) {
        return _.map(
            Hinata.parse(
                await rp(
                    liburl.resolve(
                        Hinata.BASE_URL,
                        `/s/official/diary/member/list?page=${entry.get(
                            'page'
                        )}`
                    )
                )
            ),
            (a) => new Article(a)
        );
    }
}

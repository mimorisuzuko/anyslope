import _ from 'lodash';
import rp from 'request-promise';
import Article from './models/Article';
import { simplifier } from './util';
import liburl from 'url';
import dayjs from 'dayjs';
import urljoin from 'url-join';

const dparser = new DOMParser();

export class LineBlog {
    /**
     * @param {string}
     */
    static getURL = (id) => {
        return `https://lineblog.me/${id}`;
    };

    static idToImageUrlAndName = async (id) => {
        const body = await rp(LineBlog.getURL(id));
        const $parsed = dparser.parseFromString(body, 'text/html');

        return {
            name: $parsed.querySelector('h2').innerText,
            url: $parsed.querySelector('.profile-photo-thumbnail img').src
        };
    };

    static parse = async (body) => {
        const $parsed = dparser.parseFromString(body, 'text/html');
        const ret = [];

        for (const $article of $parsed.querySelectorAll('.article')) {
            const $title = $article.querySelector('.article-title a');
            const $content = $article.querySelector('.article-body');

            ret.push({
                date: dayjs($article.querySelector('.article-date').innerText),
                title: $title.innerText,
                author: $parsed.querySelector('.profile-photo h2').innerText,
                content: $content.innerText,
                html: await simplifier.simplify($content),
                url: $title.href
            });
        }

        return ret;
    };

    static fetch = async (entry) => {
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
    };
}

export class Nogi {
    static parse = async (body) => {
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
                author: names[i].innerText.trim(),
                html: await simplifier.simplify($content),
                content: $content.innerText,
                url: (urls[i] ? urls[i] : titles[i].querySelector('a')).href
            });
        }

        return ret;
    };

    static fetch = async (entry) => {
        return _.map(
            await Nogi.parse(
                await rp(`http://blog.nogizaka46.com/?p=${entry.get('page')}`)
            ),
            (a) => new Article(a)
        );
    };
}

export class Keyaki {
    static BASE_URL = 'http://www.keyakizaka46.com';

    static parse = async (body) => {
        const ret = [];

        for (const $article of dparser
            .parseFromString(body, 'text/html')
            .querySelectorAll('article')) {
            const { innerText: datestr } = $article.querySelector(
                '.box-bottom li'
            );
            const $title = $article.querySelector('h3');
            const { innerText: name } = $article.querySelector('.name');
            const $content = $article.querySelector('.box-article');

            ret.push({
                date: dayjs(datestr),
                title: $title.innerText.trim(),
                author: name.trim(),
                html: await simplifier.simplify($content),
                content: $content.innerText,
                url: liburl.resolve(
                    Keyaki.BASE_URL,
                    _.get($title.querySelector('a'), 'pathname') || ''
                )
            });
        }

        return ret;
    };

    static fetch = async (entry) => {
        return _.map(
            await Keyaki.parse(
                await rp(
                    liburl.resolve(
                        Keyaki.BASE_URL,
                        `/s/k46o/diary/member/list?page=${entry.get('page')}`
                    )
                )
            ),
            (a) => new Article(a)
        );
    };
}

export class Hinata {
    static BASE_URL = 'https://www.hinatazaka46.com';

    static parse = async (body) => {
        const ret = [];

        for (const $article of dparser
            .parseFromString(body, 'text/html')
            .querySelectorAll('.p-blog-article')) {
            const $content = $article.querySelector('.c-blog-article__text');

            ret.push({
                date: dayjs(
                    $article.querySelector('.c-blog-article__date').innerText
                ),
                title: $article
                    .querySelector('.c-blog-article__title')
                    .innerText.trim(),
                author: $article
                    .querySelector('.c-blog-article__name')
                    .innerText.trim(),
                html: await simplifier.simplify($content),
                content: $content.innerText,
                // url: liburl.resolve(
                //     Hinata.BASE_URL,
                //     $article.querySelector('.c-button-blog-detail').pathname
                // )
                url: ''
            });
        }

        return ret;
    };

    static fetch = async (entry) => {
        return _.map(
            await Hinata.parse(
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
    };
}

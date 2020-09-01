import React from 'react';
import rp from 'request-promise';
import { css } from 'emotion';
import _ from 'lodash';
import dayjs from 'dayjs';
import liburl from 'url';
import Hls from 'hls.js';
import matchAll from 'string.prototype.matchall';
import simplifyer from './simplifier';

const cardWidth = 500;
const domparser = new DOMParser();

/**
 * @param {Element} $html
 * @returns {string}
 */
export const convertHtmlToHtmlString = ($html) => {
    const splited = simplifyer.trim(simplifyer.simplify($html)).split(/\n/);
    const s =
        splited.length === 1
            ? _.join(
                  _.map(_.split(splited[0], '<br>'), (a) => {
                      return !a
                          ? ''
                          : /^<div/.test(a)
                          ? a
                          : a !== '<br>'
                          ? `<div>${a}</div>`
                          : a;
                  }),
                  '<br>'
              )
            : _.join(
                  _.map(splited, (a) => {
                      if (!a) {
                          return '<br>';
                      }

                      return /^<div/.test(a)
                          ? a
                          : a !== '<br>'
                          ? `<div>${a}</div>`
                          : a;
                  }),
                  ''
              );

    return simplifyer.trim(s);
};

/**
 * @param {Element} $e
 * @returns {Element}
 */
const getScrollableParentOfArticle = ($e) => {
    const { parentElement } = $e;

    if (getComputedStyle($e).overflowY === 'scroll') {
        return $e;
    } else {
        return getScrollableParentOfArticle(parentElement);
    }
};

/**
 * @param {Element} $article
 */
export const scrollToArticleTop = ($article) => {
    const $parent = getScrollableParentOfArticle($article);

    $parent.scroll({ top: $article.offsetTop });
};

/**
 * @param {string} text
 * @param {string|RegExp} splitter
 */
const renderTextWithNewLines = (text, splitter) => {
    const tmplines = _.split(text, splitter);
    const lines = [tmplines.shift()];

    _.forEach(tmplines, (line, i) => {
        lines.push(line, <br key={i} />);
    });

    return lines;
};

const renderVideoInTweet = async (src) => {
    const {
        track: { playbackUrl }
    } = JSON.parse(
        await rp(
            `https://api.twitter.com/1.1/videos/tweet/config/${
                src.match(/https:\/\/twitter.com\/i\/videos\/(\d+)/)[1]
            }.json`,
            {
                headers: {
                    authorization:
                        'Bearer AAAAAAAAAAAAAAAAAAAAAIK1zgAAAAAA2tUWuhGZ2JceoId5GwYWU5GspY4%3DUq7gzFoCZs1QfwGoVdvSac3IniczZEYXIcDyumCauIXpcAPorE'
                }
            }
        )
    );
    const mediaPath = _.nth(_.split(await rp(playbackUrl), '\n'), -2);
    const id = `_hls_${Date.now()}`;

    const observer = new MutationObserver(() => {
        const hls = new Hls();
        hls.loadSource(liburl.resolve(playbackUrl, mediaPath));
        hls.attachMedia(document.getElementById(id));
        observer.disconnect();
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    return <video id={id} controls />;
};

const BackgroundImage = ({ css: base }) => {
    return (
        <div
            className={css(base, {
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center center'
            })}
        />
    );
};

const renderImagesInTweet = (matches) => {
    const { length } = matches;
    const fullWidth = 466;
    const halfWidth = 231;
    const halfHeight = 231;

    return (
        <div
            className={css({
                display: 'flex',
                marginTop: 8
            })}
        >
            {length === 1 ? (
                <BackgroundImage
                    css={css({
                        width: fullWidth,
                        height: fullWidth,
                        borderRadius: 4,
                        backgroundImage: `url(${matches[0][1]})`
                    })}
                />
            ) : length === 2 ? (
                <>
                    <BackgroundImage
                        css={css({
                            width: halfWidth,
                            height: halfHeight,
                            marginRight: 4,
                            borderTopLeftRadius: 4,
                            borderBottomLeftRadius: 4,
                            backgroundImage: `url(${matches[0][1]})`
                        })}
                    />
                    <BackgroundImage
                        css={css({
                            width: halfWidth,
                            height: halfHeight,
                            marginRight: 4,
                            borderTopRightRadius: 4,
                            borderBottomRightRadius: 4,
                            backgroundImage: `url(${matches[1][1]})`
                        })}
                    />
                </>
            ) : length === 3 ? (
                <>
                    <BackgroundImage
                        css={css({
                            width: fullWidth,
                            height: halfHeight,
                            borderTopRadius: 4,
                            marginBottom: 4,
                            backgroundImage: `url(${matches[0][1]})`
                        })}
                    />
                    <BackgroundImage
                        css={css({
                            width: halfWidth,
                            height: halfHeight,
                            marginRight: 4,
                            borderBottomLeftRadius: 4,
                            backgroundImage: `url(${matches[1][1]})`
                        })}
                    />
                    <BackgroundImage
                        css={css({
                            width: halfWidth,
                            height: halfHeight,
                            marginRight: 4,
                            borderBottomRightRadius: 4,
                            backgroundImage: `url(${matches[2][1]})`
                        })}
                    />
                </>
            ) : length === 4 ? (
                <>
                    <BackgroundImage
                        css={css({
                            width: halfWidth,
                            height: halfHeight,
                            marginRight: 4,
                            marginBottom: 4,
                            borderTopLeftRadius: 4,
                            backgroundImage: `url(${matches[0][1]})`
                        })}
                    />
                    <BackgroundImage
                        css={css({
                            width: halfWidth,
                            height: halfHeight,
                            marginRight: 4,
                            marginBottom: 4,
                            borderTopRightRadius: 4,
                            backgroundImage: `url(${matches[1][1]})`
                        })}
                    />
                    <BackgroundImage
                        css={css({
                            width: halfWidth,
                            height: halfHeight,
                            marginRight: 4,
                            borderBottomLeftRadius: 4,
                            backgroundImage: `url(${matches[2][1]})`
                        })}
                    />
                    <BackgroundImage
                        css={css({
                            width: halfWidth,
                            height: halfHeight,
                            marginRight: 4,
                            borderBottomRightRadius: 4,
                            backgroundImage: `url(${matches[3][1]})`
                        })}
                    />
                </>
            ) : null}
        </div>
    );
};

/**
 * @param {string} url
 */
export const renderTweetCard = async (url) => {
    const body = await rp(url, {
        headers: {
            'User-Agent': 'bot'
        }
    });

    const [, sceenname] = url.match(/https:\/\/twitter.com\/(.+)\/status/);
    const [, username] = body.match(
        /<meta\s+property="og:title"\s+content="(.+)\s+on Twitter">/
    );
    const picMatches = [
        ...matchAll(
            body,
            /<meta\s+property="og:image"\s+content="(.+):large">/g
        )
    ];
    const videoMatched = body.match(
        /<meta\s+property="og:video:url"\s+content="(.+)">/
    );
    const [, text] = body.match(
        /<meta\s+property="og:description"\s+content="“(.+)”">/
    );
    const [, iconUrl] = body.match(
        /<img\s+class="ProfileAvatar-image\s+"\s+src="(.+)"\s+alt=".+">/
    );
    const [, datestr] = body.match(/data-time-ms="(\d+)"/);
    const date = dayjs(datestr).format('HH:mm - YYYY年MM月DD日');

    return (
        <a
            href={url}
            className={css({
                display: 'block',
                width: cardWidth,
                color: 'inherit',
                textDecoration: 'none',
                cursor: 'pointer'
            })}
        >
            <div
                className={css({
                    borderRadius: 4,
                    border: '1px solid rgb(225, 232, 237)'
                })}
            >
                <div
                    className={css({
                        padding: 16
                    })}
                >
                    <div
                        className={css({
                            paddingBottom: 8
                        })}
                    >
                        <div
                            className={css({
                                display: 'flex',
                                lineHeight: 1.2
                            })}
                        >
                            <img
                                src={iconUrl}
                                className={css({
                                    width: 36,
                                    height: 36,
                                    borderRadius: '50%',
                                    marginRight: 8
                                })}
                            />
                            <div
                                className={css({
                                    display: 'flex',
                                    flexDirection: 'column'
                                })}
                            >
                                <span
                                    className={css({
                                        fontWeight: 'bold'
                                    })}
                                >
                                    {username}
                                </span>
                                <span
                                    className={css({
                                        color: 'rgb(101, 119, 134)',
                                        fontSize: '0.9rem'
                                    })}
                                >
                                    @{sceenname}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div
                        className={css({
                            video: {
                                borderRadius: 12,
                                marginTop: 8
                            }
                        })}
                    >
                        {renderTextWithNewLines(text.trim(), /&#10;/)}
                        <div
                            className={css({
                                color: 'rgb(105, 120, 130)',
                                fontSize: '0.9rem'
                            })}
                        >
                            {date}
                        </div>
                        {!_.isEmpty(picMatches)
                            ? renderImagesInTweet(picMatches)
                            : videoMatched
                            ? await renderVideoInTweet(videoMatched[1])
                            : null}
                    </div>
                </div>
            </div>
        </a>
    );
};

/**
 * @param {string} url
 */
export const renderInstgramCard = async (url) => {
    const body = await rp(url);
    const [, jsonstr] = body.match(
        /<script\s+type="text\/javascript">window._sharedData\s+=([\s\S]+);<\/script>\s+<script\s+type="text\/javascript">window\.__initialDataLoaded\(window._sharedData\);<\/script>/
    );
    const json = JSON.parse(jsonstr).entry_data.PostPage[0].graphql
        .shortcode_media;

    return (
        <a
            href={url}
            className={css({
                display: 'block',
                width: cardWidth,
                color: 'inherit',
                textDecoration: 'none',
                cursor: 'pointer'
            })}
        >
            <div
                className={css({
                    border: '1px solid rgb(225, 232, 237)'
                })}
            >
                <div
                    className={css({
                        padding: 8,
                        display: 'flex',
                        fontSize: '0.9rem'
                    })}
                >
                    <img
                        className={css({
                            width: 34,
                            height: 34,
                            marginRight: 8,
                            borderRadius: '50%'
                        })}
                        src={json.owner.profile_pic_url}
                    />
                    <div>
                        <div
                            className={css({
                                fontWeight: 600
                            })}
                        >
                            {json.owner.full_name}
                        </div>
                        <div className={css({ color: 'rgb(101, 119, 134)' })}>
                            @{json.owner.username}
                        </div>
                    </div>
                </div>
                <img
                    className={css({
                        display: 'block'
                    })}
                    src={json.display_url}
                />
                <div
                    className={css({
                        padding: 10,
                        lineHeight: '18px',
                        fontSize: '0.9rem'
                    })}
                >
                    {renderTextWithNewLines(
                        json.edge_media_to_caption.edges[0].node.text,
                        '\n'
                    )}
                </div>
            </div>
        </a>
    );
};

class OGPCard {
    /**
     * @param {Document} doc
     */
    _getImageUrl(doc) {
        const $img = doc.querySelector('meta[property="og:image"]');

        if ($img) {
            return $img.getAttribute('content');
        }

        return null;
    }

    /**
     * @param {Document} doc
     */
    _getSiteName(doc) {
        const $a = doc.querySelector('meta[property="og:title"]');

        if ($a) {
            return $a.getAttribute('content');
        }

        const $b = doc.querySelector('meta[property="og:site_name"]');

        if ($b) {
            return $b.getAttribute('content');
        }

        const $c = doc.querySelector('title');

        if ($c) {
            return $c.innerText;
        }

        return '';
    }

    /**
     * @param {Document} doc
     */
    _getDescription(doc) {
        const $a = doc.querySelector('meta[property="og:description"]');

        if ($a) {
            return $a.getAttribute('content');
        }

        const $b = doc.querySelector('meta[name="description"]');

        if ($b) {
            return $b.getAttribute('content');
        }

        return '';
    }

    /**
     * @param {string} url
     */
    async render(url) {
        const body = await rp(url, {
            headers: {
                'User-Agent': 'bot',
                'Accept-Language': 'ja-JP'
            }
        }).catch(({ statusCode, response: { body } }) => {
            if (statusCode === 404) {
                return body;
            }

            console.error(statusCode);

            return null;
        });

        const doc = domparser.parseFromString(body, 'text/html');
        const imgUrl = this._getImageUrl(doc);
        const siteName = this._getSiteName(doc);
        const description = this._getDescription(doc);
        const width = imgUrl ? 118 : 0;

        return (
            <a
                href={url}
                className={css({
                    textDecoration: 'none',
                    color: 'inherit'
                })}
            >
                <div
                    className={css({
                        border: '1px solid rgb(229, 229, 229)',
                        display: 'flex'
                    })}
                >
                    {imgUrl ? (
                        <div
                            className={css({
                                backgroundImage: `url(${imgUrl})`,
                                width,
                                height: width,
                                backgroundPosition: '50% 50%',
                                backgroundRepeat: 'no-repeat',
                                backgroundSize: 'cover'
                            })}
                        />
                    ) : null}
                    <div
                        className={css({
                            padding: 22,
                            width: `calc(100% - ${width}px)`,
                            boxSizing: 'border-box'
                        })}
                    >
                        <div
                            className={css({
                                fontSize: 17,
                                fontWeight: 'bold',
                                marginBottom: 3,
                                wordBreak: 'break-all',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis'
                            })}
                        >
                            {siteName}
                        </div>
                        <div
                            className={css({
                                fontSize: 13,
                                color: 'rgb(115, 115, 115)',
                                wordBreak: 'break-all',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                paddingBottom: 10
                            })}
                        >
                            {description}
                        </div>
                        <div
                            className={css({
                                fontSize: 12,
                                color: 'rgb(200, 200, 200)',
                                wordBreak: 'break-all',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis'
                            })}
                        >
                            {new URL(url).hostname}
                        </div>
                    </div>
                </div>
            </a>
        );
    }
}

export const ogpCard = new OGPCard();

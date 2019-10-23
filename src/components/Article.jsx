import React, { Component, createRef } from 'react';
import Icon from './Icon';
import { scrollToArticleTop } from '../util';
import { GoCheck } from 'react-icons/go';
import autobind from 'autobind-decorator';
import _ from 'lodash';
import { css } from 'emotion';
import { shadowBaseStyle } from '../styles';
import { shell } from 'electron';
import { connect } from 'react-redux';
import actions from '../actions';

const headerIconSize = 43;
const headerMarginRight = 8;
const articlePadding = 16;

const ArticleHeader = ({ article: { date, author, title, url }, color }) => {
    return (
        <div
            className={css({
                backgroundColor: color,
                color: 'white',
                padding: `${articlePadding}px ${articlePadding +
                    headerIconSize +
                    headerMarginRight}px`,
                position: 'relative'
            })}
        >
            <Icon
                name={author}
                size={headerIconSize}
                css={css({
                    position: 'absolute',
                    left: articlePadding,
                    top: articlePadding
                })}
            />
            <div>
                <div>{date.format('YYYY/MM/DD HH:mm:ss')}</div>
                <div
                    className={css({
                        fontSize: 20,
                        fontWeight: 'bold',
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis'
                    })}
                >
                    <a
                        href={url}
                        className={css({
                            color: 'white',
                            textDecoration: 'none',
                            ':hover': {
                                textDecoration: 'underline'
                            }
                        })}
                    >
                        {title}
                    </a>
                </div>
            </div>
        </div>
    );
};

@connect(({ checked, following, searchState, anyzaka }) => {
    return { checked, following, searchState, anyzaka };
})
class Article extends Component {
    constructor() {
        super();

        this.$base = createRef();
    }

    @autobind
    onClickCheck() {
        const {
            props: {
                dispatch,
                article: { url }
            }
        } = this;
        const {
            $base: { current: $base }
        } = this;

        dispatch(actions.toggleChecked(url));
        scrollToArticleTop($base);
    }

    /**
     * @param {Event} e
     */
    @autobind
    onClickLink(e) {
        e.preventDefault();

        const {
            currentTarget: { href }
        } = e;

        shell.openExternal(href);
    }

    componentDidMount() {
        const {
            $base: { current: $base }
        } = this;

        _.forEach($base.querySelectorAll('a'), ($a) => {
            $a.addEventListener('click', this.onClickLink);
        });
    }

    render() {
        const {
            props: {
                article,
                checked,
                following,
                searchState,
                css: baseStyle = '',
                anyzaka
            }
        } = this;
        const { author, html, url, id, debug } = article;
        const color = debug ? 'gray' : anyzaka.getGroupColorFromMember(author);
        const contentIsVisible = debug || !checked.includes(url);

        return (
            <div
                className={css(
                    baseStyle,
                    shadowBaseStyle,
                    debug || article.visible(following, searchState)
                        ? null
                        : {
                              height: 0,
                              marginBottom: 0,
                              overflow: 'hidden'
                          },
                    { position: 'relative' }
                )}
                ref={this.$base}
                data-article-id={id}
            >
                <ArticleHeader article={article} color={color} />
                <div
                    className={css({
                        marginTop: articlePadding,
                        padding: `0 ${articlePadding}px ${articlePadding}px`,
                        position: 'relative',
                        img: {
                            maxWidth: '100%'
                        },
                        video: {
                            maxWidth: '100%',
                            display: 'block'
                        },
                        display: contentIsVisible ? 'block' : 'none'
                    })}
                >
                    <div
                        className={css({
                            'p:last-child': {
                                marginBottom: 0
                            }
                        })}
                        dangerouslySetInnerHTML={{
                            __html: html
                        }}
                    />
                </div>
                <GoCheck
                    size={headerIconSize}
                    onClick={this.onClickCheck}
                    className={css(
                        {
                            position: 'absolute',
                            right: articlePadding,
                            bottom: articlePadding,
                            cursor: 'pointer'
                        },
                        contentIsVisible
                            ? {
                                  fill: 'lightgray',
                                  '&:hover': {
                                      fill: color
                                  }
                              }
                            : {
                                  fill: 'white'
                              }
                    )}
                />
            </div>
        );
    }
}

export default Article;

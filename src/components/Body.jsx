import React, { Component, createRef } from 'react';
import Article from './Article';
import { BeatLoader } from 'react-spinners';
import { css } from 'emotion';
import {
    bodyBaseStyle,
    titlebarBaseStyle,
    marginBetweenArticles
} from '../styles';
import Filter from './Filter';
import { connect } from 'react-redux';
import actions from '../actions';
import * as fetchers from '../fetchers';
import ArticleDebugger from './ArticleDebugger';
import 'react-toastify/dist/ReactToastify.min.css';

@connect(({ articles, loading, anyzaka }) => {
    return { articles, loading, anyzaka };
})
export default class Body extends Component {
    $loading = createRef();
    $articles = createRef();
    prevloadingIsVisible = true;

    fetch = async () => {
        const {
            props: { anyzaka }
        } = this;
        const slopes = anyzaka.get('slopes');
        const { size } = slopes;
        const blogs = [];

        for (let i = 0; i < size; i += 1) {
            const slope = slopes.get(i);

            blogs.push(
                await fetchers[slope.get('fetcher')]
                    .fetch(slope)
                    .catch((err) => {
                        console.error(
                            `Failed to fetch (${slope.get('name')})`,
                            err
                        );

                        return [];
                    })
            );
        }

        return blogs;
    };

    componentDidMount = () => {
        const {
            props: { dispatch }
        } = this;

        dispatch(actions.init()).then(() => {
            dispatch(actions.addArticles(this.fetch()));
            this.watchLoading();
        });
    };

    loadAndAddArticles = () => {
        const {
            props: { dispatch }
        } = this;

        dispatch(actions.startToLoadArticles());
        dispatch(actions.addArticles(this.fetch()));
    };

    onClickResetFilter = () => {
        const {
            props: { dispatch }
        } = this;

        dispatch(actions.setFilter(-1));
    };

    watchLoading = () => {
        const {
            $loading: { current: $loading },
            prevloadingIsVisible,
            props: { loading }
        } = this;
        const { top } = $loading.getBoundingClientRect();
        const loadingIsVisible = innerHeight >= top;

        if (!prevloadingIsVisible && loadingIsVisible && loading.can()) {
            this.loadAndAddArticles();
        }

        this.prevloadingIsVisible = loadingIsVisible;
        requestAnimationFrame(this.watchLoading);
    };

    onClickLoad = () => {
        this.loadAndAddArticles();
    };

    render = () => {
        const {
            props: { articles, loading }
        } = this;

        return (
            <div
                className={css(bodyBaseStyle, {
                    display: 'flex',
                    flexDirection: 'column'
                })}
            >
                <div className={titlebarBaseStyle} />
                <div
                    ref={this.$articles}
                    onClick={this.onClickResetFilter}
                    className={css({
                        flex: 1,
                        overflow: 'scroll',
                        position: 'relative'
                    })}
                >
                    <div
                        className={css({
                            minWidth: 960,
                            padding: '0 16px',
                            marginLeft: 'auto',
                            marginRight: 'auto'
                        })}
                    >
                        <ArticleDebugger />
                        {articles.map((article) => {
                            return (
                                <Article
                                    article={article}
                                    key={article.id}
                                    css={css({
                                        marginBottom: marginBetweenArticles
                                    })}
                                />
                            );
                        })}
                        <div
                            ref={this.$loading}
                            className={css({
                                margin: '16px 0',
                                textAlign: 'center'
                            })}
                        >
                            {loading.now() ? (
                                <BeatLoader
                                    css={css({
                                        display: 'inline-block'
                                    })}
                                />
                            ) : (
                                <div
                                    onClick={this.onClickLoad}
                                    className={css({
                                        color: 'rgb(233, 30, 99)',
                                        border: '1px solid rgb(233, 30, 99)',
                                        padding: '4px 8px',
                                        borderRadius: 4,
                                        cursor: 'pointer'
                                    })}
                                >
                                    さらに記事を読み込む
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <Filter />
            </div>
        );
    };
}

import React, { Component } from 'react';
import { isDevelopment } from '../config';
import { css } from 'emotion';
import { AiFillBug } from 'react-icons/ai';
import { marginBetweenArticles } from '../styles';
import * as fetchers from '../fetchers';
import _ from 'lodash';
import rp from 'request-promise';
import dayjs from 'dayjs';
import AritcleModel from '../models/Article';
import Article from './Article';

const fetchersKeys = _.keys(fetchers);

export default class ArticleDebugger extends Component {
    state = {
        debugUrl: localStorage.getItem('debugUrl') || '',
        fetchersIndex: parseInt(localStorage.getItem('fetchersKeys')) || 0,
        article: null
    };

    onChangeUrl = ({ currentTarget: { value } }) => {
        localStorage.setItem('debugUrl', value);
        this.setState({ debugUrl: value });
    };

    onChangeFetcher = ({ currentTarget: { value } }) => {
        const fetchersIndex = _.indexOf(fetchersKeys, value);

        localStorage.setItem('fetchersKeys', fetchersIndex);
        this.setState({ fetchersIndex });
    };

    fetchDebugArticle = async () => {
        const {
            state: { debugUrl, fetchersIndex }
        } = this;

        this.setState({
            article: new AritcleModel({
                ...(
                    await fetchers[fetchersKeys[fetchersIndex]].parse(
                        await rp(debugUrl)
                    )
                )[0],
                debug: true,
                date: dayjs()
            })
        });
    };

    render = () => {
        if (!isDevelopment) {
            return null;
        }

        const {
            state: { debugUrl, fetchersIndex, article }
        } = this;

        return (
            <div
                className={css({
                    backgroundColor: 'gray',
                    marginBottom: marginBetweenArticles
                })}
            >
                <div className={css({ display: 'flex', padding: 8 })}>
                    <AiFillBug
                        onClick={this.fetchDebugArticle}
                        className={css({
                            color: 'white',
                            backgroundColor: 'rgba(0, 0, 0, 0.1)',
                            padding: 5,
                            borderRadius: 4,
                            cursor: 'pointer'
                        })}
                    />
                    <select
                        onChange={this.onChangeFetcher}
                        className={css({
                            font: 'inherit',
                            marginLeft: 8,
                            display: 'inline-block'
                        })}
                        value={fetchersKeys[fetchersIndex]}
                    >
                        {_.map(fetchersKeys, (a, i) => (
                            <option value={a} key={i}>
                                {a}
                            </option>
                        ))}
                    </select>
                    <input
                        onChange={this.onChangeUrl}
                        type='url'
                        value={debugUrl}
                        className={css({
                            font: 'inherit',
                            outline: 'none',
                            border: 'none',
                            flex: 1,
                            marginLeft: 8,
                            padding: '4px 8px',
                            backgroundColor: 'rgba(0, 0, 0, 0.1)',
                            color: 'white',
                            display: 'inline-block',
                            borderRadius: 4
                        })}
                    />
                </div>
                {article ? <Article article={article} /> : null}
            </div>
        );
    };
}

import React, { Component } from 'react';
import { css } from 'emotion';
import {
    shadowBaseStyle,
    titlebarBaseStyle,
    sidebarBaseStyle,
    pink,
    sidebarItemMarginStyle
} from '../styles';
import { connect } from 'react-redux';
import SidebarArticleItem from './SidebarArticleItem';
import DateSeparator from './DateSeparator';
import SearchInSidebar from './SearchInSidebar';

@connect(({ articles, searchState }) => {
    return { articles, searchState };
})
export default class Sidebar extends Component {
    render() {
        const {
            props: { articles, searchState }
        } = this;
        const items = [];
        const { size } = articles;

        let prevArticle = null;

        for (let i = 0; i < size; i += 1) {
            const article = articles.get(i);

            if (
                searchState.searched() &&
                article !== null &&
                !searchState.test(article)
            ) {
                continue;
            }

            if (prevArticle === null) {
                items.push(
                    <DateSeparator key={`d${article.id}`} date={article.date} />
                );
            } else if (
                prevArticle.date.get('day') !== article.date.get('day')
            ) {
                items.push(
                    <DateSeparator key={`d${article.id}`} date={article.date} />
                );
            }

            items.push(
                <SidebarArticleItem article={article} key={article.id} />
            );
            prevArticle = article;
        }

        return (
            <div
                className={css(sidebarBaseStyle, shadowBaseStyle, {
                    display: 'flex',
                    flexDirection: 'column',
                    backgroundColor: pink,
                    color: 'white'
                })}
            >
                <div className={titlebarBaseStyle} />
                <div className={sidebarItemMarginStyle}>
                    <SearchInSidebar />
                </div>
                <div
                    className={css({
                        overflowY: 'scroll',
                        flex: 1
                    })}
                >
                    {items}
                </div>
            </div>
        );
    }
}

import React, { Component } from 'react';
import { css } from 'emotion';
import { connect } from 'react-redux';
import Icon from './Icon';
import { GoCheck } from 'react-icons/go';
import autobind from 'autobind-decorator';
import { scrollToArticleTop } from '../util';
import actions from '../actions';

@connect(({ following, checked, searchState }) => {
    return { following, checked, searchState };
})
export default class SidebarArticleItem extends Component {
    @autobind
    onClickItem() {
        const {
            props: { article, following, searchState, dispatch }
        } = this;

        if (!article.visible(following, searchState)) {
            dispatch(actions.showArticle(article.id));
        }

        scrollToArticleTop(
            document.querySelector(`[data-article-id="${article.id}"]`)
        );
    }

    render() {
        const {
            props: { article, following, checked, searchState }
        } = this;
        const visible = article.visible(following, searchState);

        return (
            <div
                onClick={this.onClickItem}
                className={css({
                    overflowX: 'hidden',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                    cursor: 'pointer',
                    padding: '0 8px',
                    ':hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.3)'
                    }
                })}
            >
                <GoCheck
                    style={{
                        marginRight: 4,
                        verticalAlign: 'middle',
                        visibility: checked.includes(article.url)
                            ? 'visible'
                            : 'hidden',
                        opacity: visible ? 1 : 0.5
                    }}
                />
                <Icon
                    name={article.author}
                    size={24}
                    css={css({
                        verticalAlign: 'middle',
                        marginRight: 4,
                        opacity: visible ? 1 : 0.5
                    })}
                />
                <span
                    className={css({
                        opacity: visible ? 1 : 0.5
                    })}
                >
                    {article.title}
                </span>
            </div>
        );
    }
}

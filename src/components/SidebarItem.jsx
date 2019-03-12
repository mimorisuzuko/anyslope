import React, { Component } from 'react';
import { css } from 'emotion';
import { connect } from 'react-redux';
import Icon from './Icon';
import { GoCheck } from 'react-icons/go';
import autobind from 'autobind-decorator';
import { scrollToArticleTop } from '../util';
import actions from '../actions';

@connect(({ following, checked }) => {
	return { following, checked };
})
export default class SidebarItem extends Component {
	@autobind
	onClickItem() {
		const {
			props: { article, following, dispatch }
		} = this;

		if (!article.visible(following)) {
			dispatch(actions.showArticle(article.id));
		}

		scrollToArticleTop(
			document.querySelector(`[data-article-id="${article.id}"]`)
		);
	}

	render() {
		const {
			props: { article, following, checked }
		} = this;
		const visible = article.visible(following);

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
						visibility: checked.includes(article.key)
							? 'visible'
							: 'hidden',
						opacity: visible ? 1 : 0.5
					}}
				/>
				<Icon
					name={article.name}
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

import React, { Component } from 'react';
import { css } from 'emotion';
import { connect } from 'react-redux';
import Icon from './Icon';
import { GoCheck } from 'react-icons/go';
import autobind from 'autobind-decorator';
import { scrollToArticleTop } from '../util';

@connect(({ following, checked }) => {
	return { following, checked };
})
export default class SidebarItem extends Component {
	@autobind
	onClickItem() {
		const {
			props: {
				article: { id }
			}
		} = this;

		scrollToArticleTop(document.querySelector(`[data-article-id="${id}"]`));
	}

	render() {
		const {
			props: {
				article: { name, title, id, key },
				following,
				checked
			}
		} = this;

		return (
			<div
				onClick={this.onClickItem}
				key={id}
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
						visibility: checked.includes(key)
							? 'visible'
							: 'hidden',
						opacity: following.includes(name) ? 1 : 0.5
					}}
				/>
				<Icon
					name={name}
					size={24}
					css={css({
						verticalAlign: 'middle',
						marginRight: 4,
						opacity: following.includes(name) ? 1 : 0.5
					})}
				/>
				<span
					className={css({
						opacity: following.includes(name) ? 1 : 0.5
					})}
				>
					{title}
				</span>
			</div>
		);
	}
}

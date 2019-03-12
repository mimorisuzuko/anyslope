import React, { Component } from 'react';
import { css } from 'emotion';
import { shadowBaseStyle, titlebarBaseStyle } from '../styles';
import { connect } from 'react-redux';
import autobind from 'autobind-decorator';
import SidebarItem from './SidebarItem';

@connect(({ articles }) => {
	return { articles };
})
export default class Sidebar extends Component {
	@autobind
	onClickItem() {}

	render() {
		const {
			props: { articles }
		} = this;

		return (
			<div
				className={css(shadowBaseStyle, {
					width: 220,
					height: '100%',
					boxSizing: 'border-box',
					display: 'flex',
					flexDirection: 'column',
					backgroundColor: 'rgb(244, 143, 177)',
					color: 'white'
				})}
			>
				<div className={titlebarBaseStyle} />
				<div
					className={css({
						overflowY: 'scroll',
						flex: 1
					})}
				>
					{articles.map((article) => {
						const { id } = article;

						return <SidebarItem article={article} key={id} />;
					})}
				</div>
			</div>
		);
	}
}

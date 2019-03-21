import React, { Component } from 'react';
import { css } from 'emotion';
import {
	shadowBaseStyle,
	titlebarBaseStyle,
	sidebarBaseStyle
} from '../styles';
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
				className={css(sidebarBaseStyle, shadowBaseStyle, {
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

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

@connect(({ articles }) => {
	return { articles };
})
export default class Sidebar extends Component {
	render() {
		const {
			props: { articles }
		} = this;
		const items = [];
		const { size } = articles;

		if (size > 1) {
			let prevArticle = articles.get(0);
			items.push(
				<DateSeparator
					key={`d${prevArticle.id}`}
					date={prevArticle.date}
				/>,
				<SidebarArticleItem
					article={prevArticle}
					key={prevArticle.id}
				/>
			);

			for (let i = 1; i < size; i += 1) {
				const article = articles.get(i);

				if (prevArticle.date.get('day') !== article.date.get('day')) {
					items.push(
						<DateSeparator
							key={`d${article.id}`}
							date={article.date}
						/>
					);
				}

				items.push(
					<SidebarArticleItem article={article} key={article.id} />
				);
				prevArticle = article;
			}
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

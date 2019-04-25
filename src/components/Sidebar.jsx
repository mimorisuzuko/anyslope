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
import { GoSearch } from 'react-icons/go';
import SidebarArticleItem from './SidebarArticleItem';
import DateSeparator from './DateSeparator';

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
					<div
						className={css({
							backgroundColor: 'rgb(0, 0, 0, 0.1)',
							borderRadius: 4,
							padding: '4px 8px',
							marginBottom: 8,
							boxSizing: 'border-box',
							display: 'flex',
							alignItems: 'center'
						})}
					>
						<GoSearch />
						<input
							type='text'
							className={css({
								font: 'inherit',
								display: 'block',
								border: 'none',
								outline: 'none',
								width: '100%',
								color: 'white',
								padding: 0,
								marginLeft: 8,
								backgroundColor: 'transparent'
							})}
						/>
					</div>
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

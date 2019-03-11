import React, { Component } from 'react';
import { css } from 'emotion';
import { shadowBaseStyle, titlebarBaseStyle } from '../styles';
import { connect } from 'react-redux';
import Icon from './Icon';
import { GoCheck } from 'react-icons/go';

@connect(({ articles, following, checked }) => {
	return { articles, following, checked };
})
export default class Sidebar extends Component {
	render() {
		const {
			props: { articles, following, checked }
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
						flex: 1,
						padding: '0 8px'
					})}
				>
					{articles.map(({ name, title, id, key }) => {
						return (
							<div
								key={id}
								className={css({
									overflowX: 'hidden',
									whiteSpace: 'nowrap',
									textOverflow: 'ellipsis',
									opacity: following.includes(name) ? 1 : 0.5
								})}
							>
								<GoCheck
									style={{
										marginRight: 4,
										verticalAlign: 'middle',
										visibility: checked.includes(key)
											? 'visible'
											: 'hidden'
									}}
								/>
								<Icon
									name={name}
									size={24}
									css={css({
										verticalAlign: 'middle',
										marginRight: 4
									})}
								/>
								{title}
							</div>
						);
					})}
				</div>
			</div>
		);
	}
}

import React, { Component, createRef } from 'react';
import fecha from 'fecha';
import marked from 'marked';
import Icon from './Icon';
import { anyzaka, getKeyFromArticle } from '../util';
import { GoCheck } from 'react-icons/go';
import autobind from 'autobind-decorator';
import _ from 'lodash';
import { css } from 'emotion';
import { shadowBaseStyle } from '../styles';

const checkBaseStyle = css({
	position: 'absolute',
	right: 16,
	bottom: 16,
	cursor: 'pointer'
});

class Article extends Component {
	constructor() {
		super();

		this.$base = createRef();
	}

	/**
	 * @param {Event} e
	 */
	@autobind
	onClickCheck(e) {
		const {
			props: { onClickCheck }
		} = this;
		const {
			$base: {
				current: { offsetTop }
			}
		} = this;
		const {
			currentTarget: {
				dataset: { key }
			}
		} = e;

		onClickCheck(key);
		scroll({ top: offsetTop });
	}

	render() {
		const {
			props: { article, checkedList }
		} = this;
		const { title, name, date, content } = article;
		const color = anyzaka.getGroupColorFromMember(name);
		const checked = _.includes(checkedList, getKeyFromArticle(article));

		return (
			<div className={shadowBaseStyle} ref={this.$base}>
				<div
					className={css({
						backgroundColor: color,
						color: 'white',
						padding: 16,
						display: 'flex',
						alignItems: 'center',
						'> :first-of-type': {
							marginRight: 8
						}
					})}
					style={{
						backgroundColor: color
					}}
				>
					<div>
						<Icon name={name} size={43} />
					</div>
					<div className={css({ flex: 1 })}>
						<div>{fecha.format(date, 'YY/MM/DD HH:mm:ss')}</div>
						<div
							className={css({
								fontSize: 20,
								fontWeight: 'bold'
							})}
						>
							{title}
						</div>
					</div>
					{checked ? (
						<GoCheck
							size={36}
							fill='white'
							onClick={this.onClickCheck}
							data-key={getKeyFromArticle(article)}
						/>
					) : null}
				</div>
				{checked ? null : (
					<div
						className={css({
							padding: '0 16px 16px',
							position: 'relative',
							img: {
								maxWidth: '100%',
								display: 'block'
							}
						})}
					>
						<div
							dangerouslySetInnerHTML={{
								__html: marked(content)
							}}
						/>
						<GoCheck
							size={36}
							onClick={this.onClickCheck}
							data-key={getKeyFromArticle(article)}
							className={css(checkBaseStyle, {
								fill: 'lightgray',
								'&:hover': {
									fill: color
								}
							})}
						/>
					</div>
				)}
			</div>
		);
	}
}

export default Article;

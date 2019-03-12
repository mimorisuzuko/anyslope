import React, { Component, createRef } from 'react';
import fecha from 'fecha';
import Icon from './Icon';
import { anyzaka, scrollToArticleTop } from '../util';
import { GoCheck } from 'react-icons/go';
import autobind from 'autobind-decorator';
import _ from 'lodash';
import { css } from 'emotion';
import { shadowBaseStyle } from '../styles';
import { shell } from 'electron';
import { connect } from 'react-redux';
import actions from '../actions';

@connect(({ checked, following }) => {
	return { checked, following };
})
class Article extends Component {
	constructor() {
		super();

		this.$base = createRef();
		this.$content = createRef();
	}

	@autobind
	onClickCheck() {
		const {
			props: {
				dispatch,
				article: { key }
			}
		} = this;
		const {
			$base: { current: $base }
		} = this;

		dispatch(actions.toggleChecked(key));
		scrollToArticleTop($base);
	}

	/**
	 * @param {Event} e
	 */
	onClickLink(e) {
		e.preventDefault();

		const {
			currentTarget: { href }
		} = e;

		shell.openExternal(href);
	}

	componentDidMount() {
		const {
			$content: { current: $content }
		} = this;

		_.forEach($content.querySelectorAll('a'), ($a) => {
			$a.addEventListener('click', this.onClickLink);
		});
	}

	render() {
		const {
			props: { article, checked, following, css: baseStyle = '' }
		} = this;
		const { title, name, date, content, key, id } = article;
		const color = anyzaka.getGroupColorFromMember(name);
		const isChecked = checked.includes(key);

		return (
			<div
				className={css(
					baseStyle,
					shadowBaseStyle,
					article.visible(following)
						? null
						: {
							height: 0,
							marginBottom: 0,
							overflow: 'hidden'
						  }
				)}
				ref={this.$base}
				data-article-id={id}
			>
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
					{isChecked ? (
						<GoCheck
							size={36}
							fill='white'
							onClick={this.onClickCheck}
							data-key={key}
							className={css({ cursor: 'pointer' })}
						/>
					) : null}
				</div>
				<div
					className={css({
						padding: '0 16px 16px',
						position: 'relative',
						img: {
							maxWidth: '100%',
							display: 'block'
						},
						display: isChecked ? 'none' : 'block'
					})}
				>
					<div
						ref={this.$content}
						dangerouslySetInnerHTML={{
							__html: content
						}}
					/>
					<GoCheck
						size={36}
						onClick={this.onClickCheck}
						className={css({
							position: 'absolute',
							right: 16,
							bottom: 16,
							cursor: 'pointer',
							fill: 'lightgray',
							'&:hover': {
								fill: color
							}
						})}
					/>
				</div>
			</div>
		);
	}
}

export default Article;

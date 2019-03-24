import React, { Component, createRef } from 'react';
import fecha from 'fecha';
import Icon from './Icon';
import { scrollToArticleTop } from '../util';
import { GoCheck } from 'react-icons/go';
import autobind from 'autobind-decorator';
import _ from 'lodash';
import { css } from 'emotion';
import { shadowBaseStyle } from '../styles';
import { shell } from 'electron';
import { connect } from 'react-redux';
import actions from '../actions';
import anyzaka from '../anyzaka';

const headerIconSize = 43;
const headerMarginRight = 8;
const articlePadding = 16;

const ArticleHeader = ({ article: { date, name, title }, color }) => {
	return (
		<div
			className={css({
				backgroundColor: color,
				color: 'white',
				padding: `${articlePadding}px ${articlePadding +
					headerIconSize +
					headerMarginRight}px`,
				position: 'relative'
			})}
		>
			<Icon
				name={name}
				size={headerIconSize}
				css={css({
					position: 'absolute',
					left: articlePadding,
					top: articlePadding
				})}
			/>
			<div>
				<div>{fecha.format(date, 'YY/MM/DD HH:mm:ss')}</div>
				<div
					className={css({
						fontSize: 20,
						fontWeight: 'bold',
						overflow: 'hidden',
						whiteSpace: 'nowrap',
						textOverflow: 'ellipsis'
					})}
				>
					{title}
				</div>
			</div>
		</div>
	);
};

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
		const { name, content, key, id } = article;
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
						  },
					{ position: 'relative' }
				)}
				ref={this.$base}
				data-article-id={id}
			>
				<ArticleHeader article={article} color={color} />
				<div
					className={css({
						padding: `0 ${articlePadding}px ${articlePadding}px`,
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
				</div>
				<GoCheck
					size={headerIconSize}
					onClick={this.onClickCheck}
					className={css(
						{
							position: 'absolute',
							right: articlePadding,
							bottom: articlePadding,
							cursor: 'pointer'
						},
						isChecked
							? {
								fill: 'white'
							  }
							: {
								fill: 'lightgray',
								'&:hover': {
									fill: color
								}
							  }
					)}
				/>
			</div>
		);
	}
}

export default Article;

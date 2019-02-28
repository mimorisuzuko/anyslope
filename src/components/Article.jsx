import React, { Component, createRef } from 'react';
import fecha from 'fecha';
import marked from 'marked';
import Icon from './Icon';
import { anyzaka, getKeyFromArticle } from '../util';
import { GoCheck } from 'react-icons/go';
import autobind from 'autobind-decorator';
import _ from 'lodash';
import './Article.scss';

class Article extends Component {
	constructor() {
		super();

		this.state = {
			hoverOnCheck: false
		};
		this.$base = createRef();
	}

	@autobind
	onMouseLeave() {
		this.setState({ hoverOnCheck: false });
	}

	@autobind
	onMouseEnter() {
		this.setState({ hoverOnCheck: true });
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
		this.setState({ hoverOnCheck: false });
		scroll({ top: offsetTop });
	}

	render() {
		const {
			props: { article, checkedList },
			state: { hoverOnCheck }
		} = this;
		const { title, name, date, content } = article;
		const color = anyzaka.getGroupColorFromMember(name);
		const checked = _.includes(checkedList, getKeyFromArticle(article));

		return (
			<div styleName='base' ref={this.$base}>
				<div
					styleName='header'
					style={{
						backgroundColor: color
					}}
				>
					<div>
						<Icon name={name} size={43} />
					</div>
					<div styleName='title-outer'>
						<div>{fecha.format(date, 'YY/MM/DD HH:mm:ss')}</div>
						<div styleName='title'>{title}</div>
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
					<div styleName='content'>
						<div
							dangerouslySetInnerHTML={{
								__html: marked(content)
							}}
						/>
						<GoCheck
							size={36}
							styleName='check'
							fill={hoverOnCheck ? color : 'lightgray'}
							onMouseEnter={this.onMouseEnter}
							onMouseLeave={this.onMouseLeave}
							onClick={this.onClickCheck}
							data-key={getKeyFromArticle(article)}
						/>
					</div>
				)}
			</div>
		);
	}
}

export default Article;

import React, { Component, createRef } from 'react';
import fecha from 'fecha';
import Icon from './Icon';
import { anyzaka } from '../util';
import { GoCheck } from 'react-icons/go';
import autobind from 'autobind-decorator';
import _ from 'lodash';
import { css } from 'emotion';
import { shadowBaseStyle } from '../styles';
import { shell } from 'electron';

class Article extends Component {
	constructor() {
		super();

		this.$base = createRef();
		this.$content = createRef();
	}

	@autobind
	onClickCheck() {
		const {
			props: { onClickCheck }
		} = this;
		const {
			$base: { current: $base }
		} = this;

		onClickCheck($base);
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
			props: { article, checkedList }
		} = this;
		const { title, name, date, content, key } = article;
		const color = anyzaka.getGroupColorFromMember(name);
		const checked = _.includes(checkedList, key);

		return (
			<div className={shadowBaseStyle} ref={this.$base} data-key={key}>
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
					{checked ? (
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
						display: checked ? 'none' : 'block'
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

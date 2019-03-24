import React, { Component, createRef } from 'react';
import { css } from 'emotion';
import { shadowBaseStyle, pink } from '../styles';
import { connect } from 'react-redux';
import autobind from 'autobind-decorator';
import fs from 'fs-extra';
import os from 'os';
import libpath from 'path';

const path = libpath.join(os.homedir(), '.anyzaka', 'other-blogs.json');

@connect(({ openPreferences, otherBlogs }) => {
	return { openPreferences, otherBlogs };
})
export default class Preferences extends Component {
	constructor(props) {
		super(props);

		const { otherBlogs } = props;

		this.$textarea = createRef();
		this.state = {
			otherBlogs: JSON.stringify(otherBlogs, null, 4)
		};
	}

	@autobind
	onClickSaveButton() {
		const {
			state: { otherBlogs }
		} = this;
		const json = JSON.parse(otherBlogs);

		fs.writeJsonSync(path, json);
		location.reload();
	}

	/**
	 * @param {Event} e
	 */
	@autobind
	onChange(e) {
		const {
			currentTarget: { value }
		} = e;

		this.setState({ otherBlogs: value });
	}

	render() {
		const {
			props: { openPreferences },
			state: { otherBlogs }
		} = this;

		return openPreferences ? (
			<div
				className={css({
					position: 'fixed',
					left: 0,
					top: 0,
					width: '100%',
					height: '100%',
					backgroundColor: 'rgba(0, 0, 0, 0.435)',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center'
				})}
			>
				<div
					className={css(shadowBaseStyle, {
						backgroundColor: 'white',
						width: '55%',
						position: 'relative'
					})}
				>
					<div
						className={css(shadowBaseStyle, {
							backgroundColor: pink,
							color: 'white',
							padding: 16,
							display: 'flex',
							justifyContent: 'space-between',
							alignItems: 'center'
						})}
					>
						<span
							className={css({
								fontSize: '2rem'
							})}
						>
							Preferences
						</span>
					</div>
					<div
						className={css({
							padding: 24
						})}
					>
						<textarea
							onChange={this.onChange}
							ref={this.$textarea}
							value={otherBlogs}
							className={css({
								fontFamily:
									'Menlo, Monaco, "Courier New", monospace',
								fontWeight: 'normal',
								fontSize: 12,
								lineHeight: '18px',
								letterSpacing: 0,
								width: '100%',
								height: 72,
								resize: 'none'
							})}
						/>
					</div>
					<div
						className={css({
							padding: '4px 6px',
							textAlign: 'right'
						})}
					>
						<span
							onClick={this.onClickSaveButton}
							className={css(shadowBaseStyle, {
								margin: '6px 0',
								padding: '0 16px',
								lineHeight: '36px',
								display: 'inline-block',
								backgroundColor: pink,
								color: 'white',
								cursor: 'pointer'
							})}
						>
							SAVE & RELOAD
						</span>
					</div>
				</div>
			</div>
		) : null;
	}
}

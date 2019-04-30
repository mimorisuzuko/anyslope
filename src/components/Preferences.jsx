import React, { Component } from 'react';
import { css } from 'emotion';
import { shadowBaseStyle, pink } from '../styles';
import { connect } from 'react-redux';
import autobind from 'autobind-decorator';
import fs from 'fs-extra';
import os from 'os';
import libpath from 'path';
import AceEditor from 'react-ace';
import { toast } from 'react-toastify';
import 'brace';
import 'brace/mode/json';
import 'brace/theme/github';
import actions from '../actions';

const path = libpath.join(os.homedir(), '.anyzaka', 'other-blogs.json');

@connect(({ openPreferences, otherBlogs }) => {
	return { openPreferences, otherBlogs };
})
export default class Preferences extends Component {
	@autobind
	onClickSaveButton() {
		const {
			props: { otherBlogs }
		} = this;

		try {
			const json = JSON.parse(otherBlogs);

			fs.writeJsonSync(path, json);
			location.reload();
		} catch (e) {
			toast.error(String(e), {
				position: 'top-center',
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: false
			});
		}
	}

	@autobind
	onChange(value) {
		const {
			props: { dispatch }
		} = this;

		dispatch(actions.updateOtherBlogs(value));
	}

	render() {
		const {
			props: { openPreferences, otherBlogs }
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
						<AceEditor
							value={otherBlogs}
							onChange={this.onChange}
							mode='json'
							theme='github'
							showGutter={false}
							style={{
								width: '100%',
								height: 160,
								border: '1px solid rgb(230, 236, 240)'
							}}
							editorProps={{
								$blockScrolling: true
							}}
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

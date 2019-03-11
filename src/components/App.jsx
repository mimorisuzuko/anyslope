import React, { Component, createRef } from 'react';
import autobind from 'autobind-decorator';
import _ from 'lodash';
import Article from './Article';
import fs from 'fs-extra';
import os from 'os';
import libpath from 'path';
import { BeatLoader } from 'react-spinners';
import { css } from 'emotion';
import { shadowBaseStyle } from '../styles';
import Filter from './Filter';
import { connect } from 'react-redux';
import actions from '../actions';

const anyzakaStateFilePath = libpath.join(os.homedir(), '.anyzaka');

@connect((state) => state)
class App extends Component {
	constructor() {
		super();

		this.$loading = createRef();
		this.$articles = createRef();
		this.prevloadingIsVisible = true;
		this.state = {
			following: [],
			checked: []
		};

		(async () => {
			if (!(await fs.exists(anyzakaStateFilePath))) {
				await fs.writeJSON(anyzakaStateFilePath, {
					checked: [],
					following: []
				});
			}

			const { following, checked } = await fs.readJSON(
				anyzakaStateFilePath
			);

			await this.setStateAsync({
				following,
				checked
			});
			this.loadAndAddArticles();
			this.watchLoading();
		})().catch(console.error);
	}

	async setStateAsync(state) {
		return new Promise((resolve) => {
			this.setState(state, resolve);
		});
	}

	loadAndAddArticles() {
		const {
			props: { dispatch, loading }
		} = this;

		if (!loading) {
			dispatch(actions.startToLoadArticles());
			dispatch(actions.loadArticles());
		}
	}

	async writeState() {
		const {
			state: { following, checked }
		} = this;

		await fs.writeJSON(anyzakaStateFilePath, { following, checked });
	}

	@autobind
	onClickResetFilter() {
		const {
			props: { dispatch }
		} = this;

		dispatch(actions.setFilter(-1));
	}

	@autobind
	watchLoading() {
		const {
			$loading: { current: $loading },
			prevloadingIsVisible
		} = this;
		const { top } = $loading.getBoundingClientRect();
		const loadingIsVisible = innerHeight >= top;

		if (!prevloadingIsVisible && loadingIsVisible) {
			this.loadAndAddArticles();
		}

		this.prevloadingIsVisible = loadingIsVisible;
		requestAnimationFrame(this.watchLoading);
	}

	/**
	 * @param {string} name
	 */
	@autobind
	onClickFilterMember(name) {
		const {
			state: { following }
		} = this;

		(async () => {
			await this.setStateAsync({
				following: _.includes(following, name)
					? _.pull(following, name)
					: _.concat(following, name)
			});

			await this.writeState();
		})().catch(console.error);
	}

	/**
	 * @param {HTMLDivElement} $article
	 */
	@autobind
	onClickCheck($article) {
		const {
			dataset: { key }
		} = $article;
		const {
			state: { checked },
			$articles: { current: $aricles }
		} = this;

		(async () => {
			await this.setStateAsync({
				checked: _.includes(checked, key)
					? _.pull(checked, key)
					: _.concat(checked, key)
			});
			$aricles.scroll({ top: $article.offsetTop - $aricles.offsetTop });
			await this.writeState();
		})().catch(console.error);
	}

	@autobind
	onClickLoad() {
		this.loadAndAddArticles();
	}

	render() {
		const {
			state: { following, checked },
			props: { articles, loading }
		} = this;

		return (
			<div
				className={css({
					width: '100%',
					height: '100%',
					display: 'flex',
					flexDirection: 'column'
				})}
			>
				<div
					className={css(shadowBaseStyle, {
						backgroundColor: 'rgb(233, 30, 99)',
						color: 'white',
						fontWeight: 'bold',
						fontSize: 40,
						padding: 16,
						marginBottom: 16,
						WebkitAppRegion: 'drag'
					})}
				>
					推しのブログみるやつ
				</div>
				<div
					ref={this.$articles}
					onClick={this.onClickResetFilter}
					className={css({
						flex: 1,
						overflow: 'scroll'
					})}
				>
					<div
						className={css({
							width: 960,
							marginLeft: 'auto',
							marginRight: 'auto',
							'> div': {
								marginBottom: 16
							}
						})}
					>
						{articles.map((article) => {
							const { name, id } = article;

							return _.includes(following, name) ? (
								<Article
									checkedList={checked}
									article={article}
									key={id}
									onClickCheck={this.onClickCheck}
								/>
							) : null;
						})}
					</div>
					<div
						ref={this.$loading}
						className={css({
							margin: '16px 0',
							textAlign: 'center',
							'> div': {
								display: 'inline-block'
							}
						})}
					>
						{loading ? (
							<BeatLoader />
						) : (
							<div
								onClick={this.onClickLoad}
								className={css({
									color: 'rgb(233, 30, 99)',
									border: '1px solid rgb(233, 30, 99)',
									padding: '4px 8px',
									borderRadius: 4,
									cursor: 'pointer'
								})}
							>
								さらに記事を読み込む
							</div>
						)}
					</div>
				</div>
				<div>
					<Filter
						following={following}
						onClickFilterMember={this.onClickFilterMember}
					/>
				</div>
			</div>
		);
	}
}

export default App;

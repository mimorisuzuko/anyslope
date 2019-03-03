import React, { Component, createRef } from 'react';
import autobind from 'autobind-decorator';
import _ from 'lodash';
import { fetchAll } from '../util';
import Article from './Article';
import fs from 'fs-extra';
import os from 'os';
import libpath from 'path';
import { BeatLoader } from 'react-spinners';
import { css } from 'emotion';
import { shadowBaseStyle } from '../styles';
import Filter from './Filter';

const anyzakaStateFilePath = libpath.join(os.homedir(), '.anyzaka');

class App extends Component {
	constructor() {
		super();

		this.page = 0;
		this.$loading = createRef();
		this.$articles = createRef();
		this.state = {
			articles: [],
			following: [],
			checked: [],
			loading: true,
			openFilter: -1
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
			await this.loadAndAddArticles();
		})().catch(console.error);
	}

	componentDidMount() {
		this.watchLoading();
	}

	async setStateAsync(state) {
		return new Promise((resolve) => {
			this.setState(state, resolve);
		});
	}

	async loadAndAddArticles() {
		const {
			state: { articles },
			page
		} = this;

		await this.setStateAsync({
			articles: _.concat(articles, await fetchAll(page))
		});
		this.page += 1;
		await this.setStateAsync({ loading: false });
	}

	async writeState() {
		const {
			state: { following, checked }
		} = this;

		await fs.writeJSON(anyzakaStateFilePath, { following, checked });
	}

	@autobind
	onClickResetFilter() {
		this.setState({ openFilter: -1 });
	}

	/**
	 * @param {number} key
	 */
	@autobind
	onClickFilter(key) {
		const {
			state: { openFilter }
		} = this;

		this.setState({ openFilter: key === openFilter ? -1 : key });
	}

	@autobind
	watchLoading() {
		const {
			$loading: { current: $loading },
			state: { loading }
		} = this;
		const { top } = $loading.getBoundingClientRect();

		if (innerHeight >= top && !loading) {
			(async () => {
				await this.loadAndAddArticles();
			})()
				.catch(console.error)
				.finally(() => {
					requestAnimationFrame(this.watchLoading);
				});
		} else {
			requestAnimationFrame(this.watchLoading);
		}
	}

	@autobind
	onScroll() {
		const {
			state: { loading }
		} = this;
		const {
			documentElement: { scrollHeight }
		} = document;

		if (scrollY === scrollHeight - innerHeight && !loading) {
			this.setState({ loading: true }, this.loadAndAddArticles);
		}
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

	render() {
		const {
			state: { articles, following, checked, openFilter }
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
						{_.map(articles, (article, i) => {
							const { name } = article;

							return _.includes(following, name) ? (
								<Article
									checkedList={checked}
									article={article}
									key={i}
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
						<BeatLoader />
					</div>
				</div>
				<div>
					<Filter
						following={following}
						onClickFilterMember={this.onClickFilterMember}
						onClickFilter={this.onClickFilter}
						openFilter={openFilter}
					/>
				</div>
			</div>
		);
	}
}

export default App;

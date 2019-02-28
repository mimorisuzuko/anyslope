import React, { Component, createRef } from 'react';
import autobind from 'autobind-decorator';
import _ from 'lodash';
import { fetchAll, anyzaka } from '../util';
import Article from './Article';
import FilterChild from './FilterChild';
import fs from 'fs-extra';
import os from 'os';
import libpath from 'path';
import { BeatLoader } from 'react-spinners';
import './App.scss';

const anyzakaStateFilePath = libpath.join(os.homedir(), '.anyzaka');

class App extends Component {
	constructor() {
		super();

		this.page = 0;
		this.$loading = createRef();
		this.state = {
			articles: [],
			following: [],
			checked: [],
			loading: true
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
	watchLoading() {
		const {
			$loading: {
				current: { clientTop }
			},
			state: { loading }
		} = this;

		if (clientTop >= 0 && !loading) {
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
	onClickMember(name) {
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

	@autobind
	onClickCheck(key) {
		const {
			state: { checked }
		} = this;

		(async () => {
			await this.setStateAsync({
				checked: _.includes(checked, key)
					? _.pull(checked, key)
					: _.concat(checked, key)
			});

			await this.writeState();
		})().catch(console.error);
	}

	render() {
		const {
			state: { articles, following, checked }
		} = this;

		return (
			<div styleName='base'>
				<div styleName='header'>推しのブログみるやつ</div>
				<div styleName='content'>
					<div styleName='filter'>
						{_.map(anyzaka.json(), (json, i) => {
							return (
								<FilterChild
									json={json}
									key={i}
									following={following}
									onClick={this.onClickMember}
								/>
							);
						})}
					</div>
					<div styleName='articles'>
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
				</div>
				<div styleName='loading' ref={this.$loading}>
					<BeatLoader />
				</div>
			</div>
		);
	}
}

export default App;

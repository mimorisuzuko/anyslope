import React, { Component } from 'react';
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
		this.state = {
			articles: [],
			following: [],
			loading: true
		};

		window.addEventListener('scroll', this.onScroll);

		(async () => {
			if (!(await fs.exists(anyzakaStateFilePath))) {
				await fs.writeJSON(anyzakaStateFilePath, []);
			}

			await this.setSatteAsync({
				following: await fs.readJSON(anyzakaStateFilePath)
			});
			await this.loadAndAddArticles();
		})().catch(console.error);
	}

	async setSatteAsync(state) {
		return new Promise((resolve) => {
			this.setState(state, resolve);
		});
	}

	async loadAndAddArticles() {
		const {
			state: { articles },
			page
		} = this;

		await this.setSatteAsync({
			articles: _.concat(articles, await fetchAll(page))
		});
		this.page += 1;
		await this.setSatteAsync({ loading: false });
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
			const next = _.includes(following, name)
				? _.pull(following, name)
				: _.concat(following, name);

			await new Promise((resolve) => {
				this.setState(
					{
						following: next
					},
					resolve
				);
			});

			await fs.writeJSON(anyzakaStateFilePath, next);
		})().catch(console.error);
	}

	render() {
		const {
			state: { articles, following }
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
								<Article article={article} key={i} />
							) : null;
						})}
					</div>
				</div>
				<div styleName='loading'>
					<BeatLoader />
				</div>
			</div>
		);
	}
}

export default App;

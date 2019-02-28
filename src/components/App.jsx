import React, { Component } from 'react';
import autobind from 'autobind-decorator';
import _ from 'lodash';
import { fetchAll, anyzaka } from '../util';
import Article from './Article';
import FilterChild from './FilterChild';
import fs from 'fs-extra';
import os from 'os';
import libpath from 'path';
import './App.scss';

const anyzakaStateFilePath = libpath.join(os.homedir(), '.anyzaka');

class App extends Component {
	constructor() {
		super();

		this.state = {
			articles: [],
			following: []
		};

		(async () => {
			const articles = await fetchAll();

			if (!(await fs.exists(anyzakaStateFilePath))) {
				await fs.writeJSON(anyzakaStateFilePath, []);
			}

			const following = await fs.readJSON(anyzakaStateFilePath);

			this.setState({ articles, following });
		})().catch(console.error);
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
			</div>
		);
	}
}

export default App;

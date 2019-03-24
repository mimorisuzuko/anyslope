import React, { Component, createRef } from 'react';
import autobind from 'autobind-decorator';
import Article from './Article';
import { BeatLoader } from 'react-spinners';
import { css } from 'emotion';
import { titlebarBaseStyle, bodyBaseStyle } from '../styles';
import Filter from './Filter';
import { connect } from 'react-redux';
import actions from '../actions';
import Sidebar from './Sidebar';
import { ipcRenderer } from 'electron';
import Preferences from './Preferences';

@connect(({ articles, loading }) => {
	return { articles, loading };
})
class App extends Component {
	constructor() {
		super();

		this.$loading = createRef();
		this.$articles = createRef();
		this.prevloadingIsVisible = true;
		ipcRenderer.on('menu:preferences', this.onClickPreferencesOfMenuItem);
	}

	componentDidMount() {
		this.loadAndAddArticles();
		this.watchLoading();
	}

	@autobind
	onClickPreferencesOfMenuItem() {
		const {
			props: { dispatch }
		} = this;

		dispatch(actions.setPreferencesState(true));
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

	@autobind
	onClickLoad() {
		this.loadAndAddArticles();
	}

	render() {
		const {
			props: { articles, loading }
		} = this;

		return (
			<div
				className={css({
					width: '100%',
					height: '100%',
					display: 'flex',
					flexDirection: 'row'
				})}
			>
				<Sidebar />
				<div
					className={css(bodyBaseStyle, {
						display: 'flex',
						flexDirection: 'column'
					})}
				>
					<div className={titlebarBaseStyle} />
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
								minWidth: 960,
								padding: 16,
								marginLeft: 'auto',
								marginRight: 'auto'
							})}
						>
							{articles.map((article) => {
								return (
									<Article
										article={article}
										key={article.id}
										css={css({
											marginBottom: 16
										})}
									/>
								);
							})}
							<div
								ref={this.$loading}
								className={css({
									margin: '16px 0',
									textAlign: 'center'
								})}
							>
								{loading ? (
									<BeatLoader
										css={css({
											display: 'inline-block'
										})}
									/>
								) : (
									<div
										onClick={this.onClickLoad}
										className={css({
											color: 'rgb(233, 30, 99)',
											border:
												'1px solid rgb(233, 30, 99)',
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
					</div>
					<Filter />
				</div>
				<Preferences />
			</div>
		);
	}
}

export default App;

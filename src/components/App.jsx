import React, { Component, createRef } from 'react';
import autobind from 'autobind-decorator';
import Article from './Article';
import { BeatLoader } from 'react-spinners';
import { css } from 'emotion';
import { titlebarBaseStyle } from '../styles';
import Filter from './Filter';
import { connect } from 'react-redux';
import actions from '../actions';
import Sidebar from './Sidebar';

@connect(({ articles, loading, following }) => {
	return { articles, loading, following };
})
class App extends Component {
	constructor() {
		super();

		this.$loading = createRef();
		this.$articles = createRef();
		this.prevloadingIsVisible = true;
	}

	componentDidMount() {
		this.loadAndAddArticles();
		this.watchLoading();
	}

	@autobind
	scrollToArticleTop($div) {
		const {
			$articles: { current: $articles }
		} = this;

		$articles.scroll({ top: $div.offsetTop - $articles.offsetTop });
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
			props: { articles, loading, following }
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
					className={css({
						flex: 1,
						height: '100%',
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

								return following.includes(name) ? (
									<Article
										article={article}
										key={id}
										scrollToArticleTop={
											this.scrollToArticleTop
										}
									/>
								) : null;
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
			</div>
		);
	}
}

export default App;

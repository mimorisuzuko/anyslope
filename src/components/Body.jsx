import React, { Component, createRef } from 'react';
import autobind from 'autobind-decorator';
import Article from './Article';
import { BeatLoader } from 'react-spinners';
import { css } from 'emotion';
import { bodyBaseStyle, titlebarBaseStyle } from '../styles';
import Filter from './Filter';
import { connect } from 'react-redux';
import actions from '../actions';
import 'react-toastify/dist/ReactToastify.min.css';

@connect(({ articles, loading, anyzaka }) => {
	return { articles, loading, anyzaka };
})
export default class Body extends Component {
	constructor() {
		super();

		this.$loading = createRef();
		this.$articles = createRef();
		this.prevloadingIsVisible = true;
	}

	async fetch() {
		const {
			props: { anyzaka }
		} = this;
		const slopes = anyzaka.get('slopes');
		const { size } = slopes;
		let blogs = [];

		for (let i = 0; i < size; i += 1) {
			const slope = slopes.get(i);

			blogs.push(
				await slope
					.get('_fetcher')
					.fetch(slope)
					.catch((err) => {
						console.error(
							`Failed to fetch (${slope.get('name')})`,
							err
						);

						return [];
					})
			);
		}

		return blogs;
	}

	componentDidMount() {
		const {
			props: { dispatch }
		} = this;

		dispatch(actions.init()).then(() => {
			dispatch(actions.addArticles(this.fetch()));
			this.watchLoading();
		});
	}

	loadAndAddArticles() {
		const {
			props: { dispatch }
		} = this;

		dispatch(actions.startToLoadArticles());
		dispatch(actions.addArticles(this.fetch()));
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
			prevloadingIsVisible,
			props: { loading }
		} = this;
		const { top } = $loading.getBoundingClientRect();
		const loadingIsVisible = innerHeight >= top;

		if (!prevloadingIsVisible && loadingIsVisible && loading.can()) {
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
						overflow: 'scroll',
						position: 'relative'
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
							{loading.now() ? (
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
				</div>
				<Filter />
			</div>
		);
	}
}

import React, { Component, createRef } from 'react';
import autobind from 'autobind-decorator';
import Article from './Article';
import { BeatLoader } from 'react-spinners';
import { css } from 'emotion';
import { shadowBaseStyle } from '../styles';
import Filter from './Filter';
import { connect } from 'react-redux';
import actions from '../actions';

@connect((state) => state)
class App extends Component {
	constructor() {
		super();

		this.$loading = createRef();
		this.prevloadingIsVisible = true;
	}

	componentDidMount() {
		this.loadAndAddArticles();
		this.watchLoading();
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
					onClick={this.onClickResetFilter}
					className={css({
						flex: 1,
						overflow: 'scroll',
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
							<Article article={article} key={id} />
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
					<Filter />
				</div>
			</div>
		);
	}
}

export default App;

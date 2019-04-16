import React, { Component, createRef } from 'react';
import { css } from 'emotion';
import { GoSearch } from 'react-icons/go';
import { connect } from 'react-redux';
import actions from '../actions';
import { shadowBaseStyle } from '../styles';
import autobind from 'autobind-decorator';

@connect(({ searchState, loading }) => {
	return {
		searchState,
		loading
	};
})
export default class Search extends Component {
	constructor() {
		super();

		this.$input = createRef();
		this.timer = -1;
	}

	/**
	 * @param {Event} e
	 */
	@autobind
	onChange(e) {
		const {
			currentTarget: { value }
		} = e;
		const {
			props: { dispatch },
			timer
		} = this;

		clearTimeout(timer);
		dispatch(actions.updateSearchQuery(value));
		this.timer = setTimeout(() => {
			dispatch(actions.updateParsedQuery());
		}, 300);
	}

	@autobind
	showSearch() {
		const {
			props: { dispatch }
		} = this;

		dispatch(actions.setSearchVisible(true));
	}

	@autobind
	onFocus() {
		const {
			props: { dispatch }
		} = this;

		dispatch(actions.canLoadArticles(false));
	}

	@autobind
	onBlur() {
		const {
			props: { dispatch, searchState }
		} = this;

		dispatch(actions.canLoadArticles(true));
		if (!searchState.get('query')) {
			dispatch(actions.setSearchVisible(false));
		}
	}

	componentDidUpdate({ searchState: prevSearchState }) {
		const {
			props: { searchState },
			$input: { current: $input }
		} = this;

		if (!prevSearchState.get('visible') && searchState.get('visible')) {
			$input.focus();
		}
	}

	render() {
		const {
			props: { searchState }
		} = this;

		return (
			<div
				onClick={this.showSearch}
				className={css(shadowBaseStyle, {
					position: 'fixed',
					right: 8,
					top: 16,
					display: 'flex',
					padding: '8px',
					alignItems: 'center',
					backgroundColor: 'white',
					borderRadius: 16
				})}
			>
				<GoSearch />
				{searchState.get('visible') ? (
					<input
						value={searchState.get('query')}
						onChange={this.onChange}
						onFocus={this.onFocus}
						onBlur={this.onBlur}
						ref={this.$input}
						type='text'
						spellCheck={false}
						className={css({
							marginLeft: 8,
							font: 'inherit',
							border: 'none',
							outline: 'none',
							padding: 0
						})}
					/>
				) : null}
			</div>
		);
	}
}

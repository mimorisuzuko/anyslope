import React, { Component, createRef } from 'react';
import { css } from 'emotion';
import { connect } from 'react-redux';
import { GoSearch } from 'react-icons/go';
import autobind from 'autobind-decorator';
import actions from '../actions';

@connect(({ searchState, loading }) => {
	return { searchState, loading };
})
export default class SearchInSidebar extends Component {
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
	onFocus() {
		const {
			props: { dispatch }
		} = this;

		dispatch(actions.canLoadArticles(false));
	}

	@autobind
	onBlur() {
		const {
			props: { dispatch }
		} = this;

		dispatch(actions.canLoadArticles(true));
	}

	@autobind
	onClick() {
		const {
			$input: { current: $input }
		} = this;

		$input.focus();
	}

	render() {
		const {
			props: { searchState }
		} = this;

		return (
			<div
				onClick={this.onClick}
				className={css({
					backgroundColor: 'rgb(0, 0, 0, 0.1)',
					borderRadius: 4,
					padding: '4px 8px',
					marginBottom: 8,
					boxSizing: 'border-box',
					display: 'flex',
					alignItems: 'center'
				})}
			>
				<GoSearch />
				<input
					value={searchState.get('query')}
					onChange={this.onChange}
					onFocus={this.onFocus}
					onBlur={this.onBlur}
					ref={this.$input}
					type='text'
					spellCheck={false}
					className={css({
						font: 'inherit',
						display: 'block',
						border: 'none',
						outline: 'none',
						width: '100%',
						color: 'white',
						padding: 0,
						marginLeft: 8,
						backgroundColor: 'transparent'
					})}
				/>
			</div>
		);
	}
}

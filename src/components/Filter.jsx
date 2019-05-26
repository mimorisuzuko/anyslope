import React, { Component } from 'react';
import _ from 'lodash';
import { css } from 'emotion';
import Icon from './Icon';
import { GoTriangleDown, GoTriangleRight } from 'react-icons/go';
import { shadowBaseStyle } from '../styles';
import autobind from 'autobind-decorator';
import { connect } from 'react-redux';
import actions from '../actions';

@connect(({ openFilterIndex, following, anyzaka }) => {
	return { openFilterIndex, following, anyzaka };
})
export default class Filter extends Component {
	/**
	 * @param {Event} e
	 */
	@autobind
	onClickFilter(e) {
		const {
			currentTarget: {
				dataset: { strkey }
			}
		} = e;
		const {
			props: { dispatch, openFilterIndex }
		} = this;
		const key = parseInt(strkey);

		dispatch(actions.setFilter(key === openFilterIndex ? -1 : key));
	}

	/**
	 * @param {Event} e
	 */
	@autobind
	onClickFilterMember(e) {
		const {
			props: { dispatch }
		} = this;
		const {
			currentTarget: {
				dataset: { member }
			}
		} = e;

		dispatch(actions.toggleFollowing(member));
	}

	render() {
		const {
			props: {
				following,
				openFilterIndex,
				anyzaka: { entries }
			}
		} = this;

		return (
			<div
				className={css(shadowBaseStyle, {
					padding: 8
				})}
			>
				<div
					className={css({
						marginBottom: 4
					})}
				>
					{_.map(entries, ({ name, color, members }, i) => {
						return (
							<span
								onClick={this.onClickFilter}
								key={i}
								data-strkey={i}
								className={css({
									color,
									cursor: 'pointer',
									i: {
										verticalAlign: 'middle'
									}
								})}
							>
								{openFilterIndex === i ? (
									<GoTriangleDown
										className={css({
											verticalAlign: 'middle'
										})}
									/>
								) : (
									<GoTriangleRight
										className={css({
											verticalAlign: 'middle'
										})}
									/>
								)}
								<span
									className={css({
										fontWeight: 'bold',
										marginRight: 2,
										verticalAlign: 'middle'
									})}
								>
									{name}
								</span>
								{_.map(members, (member) => {
									return following.includes(member) &&
										openFilterIndex !== i ? (
											<Icon
												name={member}
												size={24}
												key={member}
											/>
										) : null;
								})}
							</span>
						);
					})}
				</div>
				<div
					className={css({
						display: 'flex',
						flexWrap: 'wrap'
					})}
				>
					{_.map(entries, ({ members }, i) => {
						return openFilterIndex === i
							? _.map(members, (member) => {
								return (
									<div
										onClick={this.onClickFilterMember}
										key={member}
										data-member={member}
										className={css(shadowBaseStyle, {
											display: 'flex',
											alignItems: 'center',
											marginRight: 8,
											marginBottom: 8,
											padding: 4,
											borderRadius: 4,
											cursor: 'pointer',
											opacity: following.includes(
												member
											)
												? 1
												: 0.5,
											'> :first-of-type': {
												marginRight: 4
											}
										})}
									>
										<Icon name={member} size={36} />
										<span>{member}</span>
									</div>
								);
							  })
							: null;
					})}
				</div>
			</div>
		);
	}
}

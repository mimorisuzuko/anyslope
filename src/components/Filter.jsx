import React, { Component } from 'react';
import { anyzaka } from '../util';
import _ from 'lodash';
import { css } from 'emotion';
import Icon from './Icon';
import { GoTriangleDown, GoTriangleRight } from 'react-icons/go';
import { shadowBaseStyle } from '../styles';
import autobind from 'autobind-decorator';

const json = anyzaka.json();

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
			props: { onClickFilter }
		} = this;
		const key = parseInt(strkey);

		onClickFilter(key);
	}

	/**
	 * @param {Event} e
	 */
	@autobind
	onClickFilterMember(e) {
		const {
			props: { onClickFilterMember }
		} = this;
		const {
			currentTarget: {
				dataset: { name }
			}
		} = e;

		onClickFilterMember(name);
	}

	render() {
		const {
			props: { following, openFilter }
		} = this;

		return (
			<div
				className={css({
					padding: 8,
					borderTop: '1px solid rgb(237, 239, 241)'
				})}
			>
				<div
					className={css({
						marginBottom: 4
					})}
				>
					{_.map(json, ({ name, color, members }, i) => {
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
								{openFilter === i ? (
									<GoTriangleDown />
								) : (
									<GoTriangleRight />
								)}
								<span
									className={css({
										fontWeight: 'bold',
										marginRight: 2
									})}
								>
									{name}
								</span>
								{_.map(members, (member) => {
									return _.includes(following, member) &&
										openFilter !== i ? (
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
					{_.map(json, ({ members }, i) => {
						return openFilter === i
							? _.map(members, (member) => {
								return (
									<div
										onClick={this.onClickFilterMember}
										key={member}
										data-name={member}
										className={css(shadowBaseStyle, {
											display: 'flex',
											alignItems: 'center',
											marginRight: 8,
											marginBottom: 8,
											padding: 4,
											borderRadius: 4,
											cursor: 'pointer',
											opacity: _.includes(
												following,
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

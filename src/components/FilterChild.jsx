import React, { Component } from 'react';
import _ from 'lodash';
import Icon from './Icon';
import autobind from 'autobind-decorator';
import { GoTriangleDown, GoTriangleRight } from 'react-icons/go';
import { css } from 'emotion';
import { shadowBaseStyle } from '../styles';

export default class FilterChild extends Component {
	constructor() {
		super();

		this.state = {
			open: false
		};
	}

	/**
	 * @param {Event} e
	 */
	@autobind
	onClick(e) {
		const {
			currentTarget: {
				dataset: { name }
			}
		} = e;
		const {
			props: { onClick }
		} = this;

		onClick(name);
	}

	@autobind
	onClickHeader() {
		this.setState(({ open }) => ({
			open: !open
		}));
	}

	render() {
		const {
			props: {
				json: { name, members, color },
				following
			},
			state: { open }
		} = this;

		return (
			<div
				className={css({
					marginBottom: 8
				})}
			>
				<div
					className={css({
						fontWeight: 'bold',
						cursor: 'pointer',
						i: {
							verticalAlign: 'middle'
						},
						color
					})}
					onClick={this.onClickHeader}
				>
					{open ? <GoTriangleDown /> : <GoTriangleRight />}
					<span className={css({ marginRight: 4 })}>{name}</span>
					{open
						? null
						: _.map(members, (member, i) => {
							return _.includes(following, member) ? (
								<Icon name={member} size={24} key={i} />
							) : null;
						  })}
				</div>
				<div
					className={css({
						display: 'flex',
						flexWrap: 'wrap'
					})}
				>
					{open
						? _.map(members, (member, i) => {
							return (
								<div
									onClick={this.onClick}
									key={i}
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
						: null}
				</div>
			</div>
		);
	}
}

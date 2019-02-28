import React, { Component } from 'react';
import _ from 'lodash';
import Icon from './Icon';
import autobind from 'autobind-decorator';
import { GoTriangleDown, GoTriangleRight } from 'react-icons/go';
import './FilterChild.scss';

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
			<div styleName='base'>
				<div
					style={{ color }}
					styleName='header'
					onClick={this.onClickHeader}
				>
					{open ? <GoTriangleDown /> : <GoTriangleRight />}
					<span styleName='group-name'>{name}</span>
					{open
						? null
						: _.map(members, (member, i) => {
							return _.includes(following, member) ? (
								<Icon name={member} size={24} key={i} />
							) : null;
						  })}
				</div>
				<div styleName='members'>
					{open
						? _.map(members, (member, i) => {
							return (
								<div
									onClick={this.onClick}
									key={i}
									data-name={member}
									styleName='member'
									style={{
										opacity: _.includes(
											following,
											member
										)
											? 1
											: 0.5
									}}
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

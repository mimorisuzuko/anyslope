import React, { Component } from 'react';
import _ from 'lodash';
import Icon from './Icon';
import autobind from 'autobind-decorator';
import './FilterChild.scss';

export default class FilterChild extends Component {
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

	render() {
		const {
			props: {
				json: { name, members, color },
				following
			}
		} = this;

		return (
			<div styleName='base'>
				<div style={{ color }} styleName='group-name'>
					{name}
				</div>
				<div styleName='members'>
					{_.map(members, (member) => {
						return (
							<div
								onClick={this.onClick}
								key={member}
								data-name={member}
								styleName='member'
								style={{
									opacity: _.includes(following, member)
										? 1
										: 0.5
								}}
							>
								<Icon name={member} size={36} />
								<span>{member}</span>
							</div>
						);
					})}
				</div>
			</div>
		);
	}
}

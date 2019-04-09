import React, { PureComponent } from 'react';
import { css } from 'emotion';

export default class DateSeparator extends PureComponent {
	render() {
		const {
			props: { date }
		} = this;

		return (
			<div
				className={css({
					margin: '0 8px 0px 24px',
					borderBottom: '1px solid white'
				})}
			>
				{date.format('YY/MM/DD')}
			</div>
		);
	}
}

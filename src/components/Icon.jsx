import React, { Component } from 'react';
import { anyzaka } from '../util';
import './Icon.scss';

class Icon extends Component {
	render() {
		const {
			props: { name, size = 48 }
		} = this;

		return (
			<i
				styleName='base'
				style={{
					background: `url("${anyzaka.toMemberIconPath(
						name
					)}") no-repeat`,
					width: size,
					height: size
				}}
			/>
		);
	}
}

export default Icon;

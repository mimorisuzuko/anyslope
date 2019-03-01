import React, { Component } from 'react';
import { anyzaka } from '../util';
import { css } from 'emotion';

class Icon extends Component {
	render() {
		const {
			props: { name, size = 48 }
		} = this;

		return (
			<i
				className={css({
					display: 'inline-block',
					borderRadius: '50%',
					backgroundSize: 'cover',
					backgroundRepeat: 'no-repeat',
					backgroundImage: `url("${anyzaka.toMemberIconPath(name)}")`,
					width: size,
					height: size
				})}
			/>
		);
	}
}

export default Icon;

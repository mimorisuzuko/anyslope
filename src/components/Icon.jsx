import React, { Component } from 'react';
import { anyzaka } from '../util';
import { css } from 'emotion';

class Icon extends Component {
	render() {
		const {
			props: { name, size = 48, css: baseStyle }
		} = this;

		return (
			<i
				className={css(baseStyle, {
					display: 'inline-block',
					borderRadius: '50%',
					backgroundSize: 'cover',
					backgroundRepeat: 'no-repeat',
					backgroundImage: `url("${anyzaka.toMemberIconPath(
						name
					)}"), url(assets/icons/fallback.png)`,
					width: size,
					height: size
				})}
			/>
		);
	}
}

export default Icon;

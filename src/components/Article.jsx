import React, { Component } from 'react';
import fecha from 'fecha';
import marked from 'marked';
import Icon from './Icon';
import { anyzaka } from '../util';
import './Article.scss';

class Article extends Component {
	render() {
		const {
			props: {
				article: { title, name, date, content }
			}
		} = this;

		return (
			<div styleName='base'>
				<div
					styleName='header'
					style={{
						backgroundColor: anyzaka.getGroupColorFromMember(name)
					}}
				>
					<div>
						<Icon name={name} size={43} />
					</div>
					<div>
						<div>{fecha.format(date, 'YY/MM/DD HH:mm:ss')}</div>
						<div styleName='title'>{title}</div>
					</div>
				</div>
				<div styleName='content'>
					<div
						dangerouslySetInnerHTML={{ __html: marked(content) }}
					/>
				</div>
			</div>
		);
	}
}

export default Article;

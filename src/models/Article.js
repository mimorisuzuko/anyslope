import { Record } from 'immutable';
import uuid from 'uuid/v4';
import _ from 'lodash';

export default class Article extends Record({
	id: '',
	date: new Date(),
	title: '',
	name: '',
	content: ''
}) {
	constructor(...args) {
		super(_.merge(...args, { id: uuid() }));
	}

	get key() {
		const { title, name } = this;

		return `${name}-${title}`;
	}
}

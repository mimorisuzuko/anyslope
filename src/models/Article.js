import { Record } from 'immutable';
import uuid from 'uuid/v4';
import _ from 'lodash';

export default class Article extends Record({
	id: '',
	date: new Date(),
	title: '',
	name: '',
	content: '',
	temporaryVisible: false,
	url: ''
}) {
	constructor(...args) {
		super(_.merge(...args, { id: uuid() }));
	}

	/**
	 * @param {} following
	 * @returns {boolean}
	 */
	visible(following) {
		const { name, temporaryVisible } = this;

		return following.includes(name) || temporaryVisible;
	}
}

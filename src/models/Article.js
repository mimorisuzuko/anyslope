import { Record } from 'immutable';
import uuid from 'uuid/v4';
import _ from 'lodash';

export default class Article extends Record({
	id: '',
	date: new Date(),
	title: '',
	author: '',
	contentHtml: '',
	content: '',
	temporaryVisible: false,
	url: ''
}) {
	constructor(...args) {
		super(_.merge(...args, { id: uuid() }));
	}

	/**
	 * @param {} following
	 * @param {} searchState
	 * @returns {boolean}
	 */
	visible(following, searchState) {
		const { author, temporaryVisible } = this;

		if (!searchState.searched()) {
			return following.includes(author) || temporaryVisible;
		}

		return (
			(searchState.test(this) && following.includes(author)) ||
			temporaryVisible
		);
	}
}

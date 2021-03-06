import { Record } from 'immutable';
import uuid from 'uuid/v4';
import _ from 'lodash';

export default class Article extends Record({
	id: '',
	date: new Date(),
	title: '',
	author: '',
	html: '',
	content: '',
	temporaryVisible: false,
	url: '',
	filtered: false,
	debug: false
}) {
	constructor(args) {
		if (!args.title) {
			args.title = '(No title)';
		}

		super(_.merge(args, { id: uuid() }));
	}

	/**
	 * @param {} following
	 * @param {} searchState
	 * @returns {boolean}
	 */
	visible(following, searchState) {
		const { author, temporaryVisible, filtered } = this;

		if (!searchState.searched()) {
			return (
				(following.includes(author) && !filtered) || temporaryVisible
			);
		}

		return (
			(searchState.test(this) &&
				following.includes(author) &&
				!filtered) ||
			temporaryVisible
		);
	}
}

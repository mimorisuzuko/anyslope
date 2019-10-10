import { Record } from 'immutable';

export default class Loading extends Record({
	_now: false,
	_can: true
}) {
	can() {
		const { _now, _can } = this;

		return !_now && _can;
	}

	now() {
		const { _now } = this;

		return _now;
	}
}

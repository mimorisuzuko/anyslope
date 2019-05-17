import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import state from './reducers';
import promiseMiddleware from 'redux-promise';
import actions from './actions';

const store = createStore(state, applyMiddleware(promiseMiddleware));
const $main = document.querySelector('main');

store.dispatch(actions.init());

const render = () => {
	const { default: App } = require('./components/App');

	ReactDOM.render(
		<AppContainer>
			<Provider store={store}>
				<App />
			</Provider>
		</AppContainer>,
		$main
	);
};

render();
if (module.hot) {
	module.hot.accept(render);
}

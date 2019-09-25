import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import state from './reducers';
import promiseMiddleware from 'redux-promise';
import fs from 'fs-extra';
import {
	CONFIG_DIR,
	EXTRA_BLOGS_CONFIG_PATH,
	CACHED_EXTRA_BLOGS_CONFIG_PATH
} from './config';

if (!fs.existsSync(CONFIG_DIR)) {
	fs.mkdirSync(CONFIG_DIR);
}

if (!fs.existsSync(EXTRA_BLOGS_CONFIG_PATH)) {
	fs.writeJsonSync(EXTRA_BLOGS_CONFIG_PATH, {});
}

if (!fs.existsSync(CACHED_EXTRA_BLOGS_CONFIG_PATH)) {
	fs.writeJsonSync(CACHED_EXTRA_BLOGS_CONFIG_PATH, {});
}

const store = createStore(state, applyMiddleware(promiseMiddleware));
const $main = document.querySelector('main');

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

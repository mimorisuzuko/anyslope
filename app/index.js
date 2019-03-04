const { app, BrowserWindow } = require('electron');
const libpath = require('path');
const {
	env: { NODE_ENV }
} = process;

/** @type {Electron.BrowserWindow} */
let browserWindow = null;

const create = () => {
	const w = new BrowserWindow({
		width: 1000,
		height: 1000,
		titleBarStyle: 'hidden'
	});

	w.loadURL(
		NODE_ENV === 'development'
			? 'http://localhost:3000'
			: `file://${libpath.join(__dirname, 'dst/index.html')}`
	);
	w.on('closed', () => {
		browserWindow = null;
	});

	browserWindow = w;
};

app.on('ready', () => {
	create();

	if (NODE_ENV === 'development') {
		const {
			default: installExtension,
			REACT_DEVELOPER_TOOLS
		} = require('electron-devtools-installer');

		installExtension(REACT_DEVELOPER_TOOLS).catch(console.error);
	}
});

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	if (!browserWindow) {
		create();
	}
});

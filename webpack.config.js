const {
	DefinePlugin,
	HotModuleReplacementPlugin,
	LoaderOptionsPlugin
} = require('webpack');
const libpath = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = (env, { mode }) => {
	const dst = 'app/dst';
	const context = libpath.join(__dirname, 'src/');
	const presets = ['@babel/react'];
	const isProduction = mode === 'production';
	const babelPlugins = [
		['@babel/plugin-proposal-decorators', { legacy: true }],
		['@babel/plugin-proposal-class-properties', { loose: false }]
	];

	const plugins = [
		new CleanWebpackPlugin([dst], {
			root: __dirname,
			verbose: false,
			dry: false,
			exclude: ['index.html', 'assets']
		}),
		new DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify(mode)
			}
		}),
		new LoaderOptionsPlugin({
			options: {
				context
			}
		}),
		new CopyPlugin([{ from: 'assets/icons', to: 'assets/icons' }])
	];

	if (isProduction) {
		presets.push([
			'@babel/env',
			{
				targets: {
					chrome: 59
				}
			}
		]);
		babelPlugins.push(
			'@babel/plugin-syntax-dynamic-import',
			'@babel/plugin-syntax-import-meta',
			'@babel/plugin-proposal-json-strings'
		);
	} else {
		babelPlugins.push('react-hot-loader/babel');
		plugins.push(new HotModuleReplacementPlugin());
	}

	return {
		context,
		entry: isProduction
			? ['@babel/polyfill', context]
			: [
				'webpack-dev-server/client?http://0.0.0.0:3000',
				'webpack/hot/only-dev-server',
				'react-hot-loader/patch',
				context
			  ],
		output: {
			path: libpath.join(__dirname, dst),
			publicPath: 'http://localhost:3000/',
			filename: '[name].js'
		},
		module: {
			rules: [
				{
					test: /\.js(x?)$/,
					exclude: /node_modules/,
					loader: 'babel-loader',
					options: {
						babelrc: false,
						presets,
						plugins: babelPlugins
					}
				},
				{
					test: /\.css$/,
					use: ['style-loader', 'css-loader']
				}
			]
		},
		resolve: {
			extensions: ['.js', '.jsx']
		},
		target: 'electron-renderer',
		plugins,
		devServer: {
			hot: true,
			port: 3000,
			host: '0.0.0.0',
			contentBase: libpath.join(__dirname, dst)
		},
		optimization: {
			splitChunks: {
				name: 'vendor',
				chunks: 'initial'
			}
		}
	};
};

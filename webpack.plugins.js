/* eslint-disable @typescript-eslint/no-var-requires */
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const { DefinePlugin } = require('webpack');

const plugins = [new ForkTsCheckerWebpackPlugin()];
if (process.env.NODE_ENV) {
  plugins.push(new DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify('production') }))
}

module.exports = plugins;

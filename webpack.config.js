require('@babel/polyfill')
const html = require('html-webpack-plugin')
const path = require('path')
var webpack = require('webpack');
var $ = require("jquery")

module.exports = {
    entry: ['@babel/polyfill', './src/index.js'],
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                     loader: 'babel-loader'
            }
            }, {
                test: /\.html$/,
                exclude: /node_modules/,
                use: {
                    loader: 'html-loader'
                }
            }, {
                test: /\.css$/,
                exclude: /node_modules/,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader' }
                ]
            }
        ]
    },
    plugins: [
        new html({
            template: './src/index.html',
            filename: './index.html'
        }),
        new webpack.ProvidePlugin({
            "$":"jquery",
            "jQuery":"jquery",
            "window.jQuery":"jquery"
          }),
    ],
}
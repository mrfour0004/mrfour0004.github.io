var path = require('path');
var HTMLWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var DefinePlugin = require("webpack/lib/DefinePlugin")
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");

var node_modules = path.resolve(__dirname, 'node_modules');

var config = {
    entry: {
        main: ['./app/boot.js'],
        vendors: ['react', 'react-dom', 'react-router', 'classNames', 'redux', 'react-redux', 'redux-simple-router']
    },
    output: {
        path: './',
        filename: './build/[name].js',
        pathinfo: true
    },
    module: {
        loaders: [{
            test: /\.jsx?$/, // 用正则来匹配文件路径，这段意思是匹配 js 或者 jsx
            exclude: /node_modules/,
            loader: 'babel-loader' // 加载模块 "babel" 是 "babel-loader" 的缩写
        }, {
            test: /\.scss$/,
            loader: ExtractTextPlugin.extract("style","css!sass")
        }]
    },
    resolve: {
        modulesDirectories: ['node_modules', 'app/js', 'app/js/views', 'app/js/reducers', 'app/js/actions', 'app/assets/css']
    },
    plugins: [
        new HTMLWebpackPlugin({
            title: "mrfour - portfolio",
            filename: "index.html",
            template: "./app/index.html",
            inject: "body"
        }),
        new ExtractTextPlugin("./build/[name].css"),
        new DefinePlugin({
            'process.env.NODE_ENV': '"production"'
        }),
        new CommonsChunkPlugin('venders', './build/vendor.js')
    ]
};

module.exports = config;

var path = require('path');
var HTMLWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");

// let webpack fetch the minified js files, instead of going to nodes_modules.
var node_modules = path.resolve(__dirname, 'node_modules');
var pathToReact = path.resolve(node_modules, 'react/dist/react-with-addons.js');
var pathToReactDOM = path.resolve(node_modules, 'react-dom/dist/react-dom.min.js');

var config = {
    entry: {
        //'webpack/hot/dev-server',
        main: ['webpack/hot/dev-server', 'webpack-dev-server/client?http://localhost:8080', './app/boot.js'],
        //main: ['./app/boot.js'],
        vendors: ['react', 'react-dom', 'react-router', 'classNames', 'redux', 'react-redux', 'redux-simple-router']
    },
    output: {
        path: './',
        filename: './build/[name].js',
        pathinfo: true
    },
    devtool: 'inline-source-map', // "source-map" or "inline-source-map"
    module: {
        loaders: [{
            test: /\.jsx?$/, // 用正则来匹配文件路径，这段意思是匹配 js 或者 jsx
            exclude: /node_modules/,
            loader: 'babel-loader' // 加载模块 "babel" 是 "babel-loader" 的缩写
        }, {
            test: /\.scss$/,
            loader: ExtractTextPlugin.extract("style","css!sass")
        }]
        // A RegExp or an array of RegExps. Don’t parse files matching.

        // noParse: [
        //     'react', // Whenever Webpack tries to parse the minified file, we stop it, as it is not necessary
        //     'react-dom', //pathToReactDOM
        //     'react-router'
        // ]
    },
    /*
    *    Options affecting the resolving of modules.
    *    https://webpack.github.io/docs/configuration.html#resolve
    */
    resolve: {

        alias: { // Replace modules by other modules or paths.
            'react': pathToReact,
            'react-dom': pathToReactDOM
        },
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
        new CommonsChunkPlugin('./build/vendors.js')
    ]
};

module.exports = config;

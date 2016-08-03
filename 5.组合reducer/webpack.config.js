var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var openBrowserWebpackPlugin = require('open-browser-webpack-plugin');
var webpack = require('webpack');

module.exports = {
    entry: path.resolve(__dirname,'app/1.redux.js'),
    output: {
        path: path.resolve(__dirname, 'build'),//输出路径
        filename: 'bundle.js' //输出文件名
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel',
                exclude:/node_modules/,
                include:path.resolve(__dirname,'app')
            }
        ],
    },
    devServer: {
        inline:true,
        stats: {colors: true}, //显示颜色
        port: 8080,//端口
        contentBase: 'build',//指定静态文件的根目录
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: '珠峰React课程',
            template: './index.html'
        }),
        new openBrowserWebpackPlugin({ url: 'http://localhost:8080' }),
    ]
};
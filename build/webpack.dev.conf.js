/**
 * Created by wuming on 2017/7/11.
 */
var path = require('path');
var webpack = require('webpack');
var merge = require('webpack-merge');
var baseWebpackConfig = require('./webpack.base.conf');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');
module.exports = merge(baseWebpackConfig, {
    plugins:[
        //生成index.html
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname,'..','./src/index.html')
            // filename: 'test.html' 不设置的情况下默认是index.html
        }),
        //热加载
        new webpack.HotModuleReplacementPlugin(),
        //webpack启动后自动打开游览器
        new OpenBrowserPlugin({
            url: 'http://localhost:8080'
        }),
        // 通过__DEV__可直接判断是否在开发模式下
        new webpack.DefinePlugin({
            __DEV__: JSON.stringify(JSON.parse((process.env.NODE_ENV == 'dev') || 'false'))
        })
    ],
    devServer: {
        proxy: {
            // 所有以'/api' 开头的 http 请求，都会被代理到 localhost:3000。
            '/api': {
                target: 'http://localhost:3000',
            }
        },
        //contentBase: path.join(__dirname, "static"), //设置静态文件目录，我是不太用，如果有人需要可以加上
        historyApiFallback: true, //不跳转
        inline: true, //实时刷新
        hot: true  // 启用 webpack 的模块热替换特性
    }
});
/**
 * Created by wuming on 2017/7/11.
 */
var path = require('path')
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var merge = require('webpack-merge');
var baseWebpackConfig = require('./webpack.base.conf');
var UglifyJSPlugin = require('uglifyjs-webpack-plugin');
module.exports = merge(baseWebpackConfig, {
    entry: {
        app: './src/main.js',
        vendor:[
            "react",
            "react-dom"
        ]
    },
    output: {
        path: path.resolve(__dirname, '..', './dist'),
        filename: '[name].[chunkhash].js',
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: ExtractTextPlugin.extract({
                    use:['style-loader','css-loader','postcss-loader']
                })
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use:ExtractTextPlugin.extract({
                    use:['style-loader','css-loader','postcss-loader','sass-loader']

                })
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                }
            },

        ]
    },
    plugins: [
        //生成index.html
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname,'..','./src/index.html'),
            // filename: 'test.html' 不设置的情况下默认是index.html
        }),
        //定义全局变量
        new webpack.DefinePlugin({
            'process.env':{
                'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
            }
        }),
        //为组件和模块分配ID，通过这个插件webpack可以分析和优先考虑使用最多的模块，并为它们分配最小的ID，通过分析ID，可以建议降低总文件的大小
        new webpack.optimize.OccurrenceOrderPlugin(),
        //提取公共js代码
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: '[name].[chunkhash].js'
        }),
        //提取css
        new ExtractTextPlugin('[name].[chunkhash].css'),
        //压缩代码
        new UglifyJSPlugin({
            compress:{
                warnings:false
            }
        }),
        // 通过__DEV__可直接判断是否在开发模式下
        new webpack.DefinePlugin({
            __DEV__: JSON.stringify(JSON.parse((process.env.NODE_ENV == 'dev') || 'false'))
        }),
    ]
});
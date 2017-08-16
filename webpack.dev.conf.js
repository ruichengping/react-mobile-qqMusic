const path = require('path');
const webpack = require('webpack');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const pxtorem = require('postcss-pxtorem');
const amwWebpack = require('antd-mobile-web/webpack');
const postcssOpts = {
    ident: 'postcss', // https://webpack.js.org/guides/migrating/#complex-options
    plugins: () => [
        autoprefixer({
            browsers: ['last 2 versions', 'Firefox ESR', '> 1%', 'ie >= 8', 'iOS >= 8', 'Android >= 4'],
        }),
        pxtorem({ rootValue: 100, propWhiteList: [] })
    ],
};
module.exports = {
    entry: {
        app: './src/main.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[hash].js',
        publicPath:'/'
    },
    resolve: {
        modules: [path.resolve(__dirname, 'node_modules'), path.join(__dirname, 'src')],
        extensions: ['.web.js', '.jsx', '.js', '.json']
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    { loader: 'css-loader', options: { importLoaders: 1 } },
                    { loader: 'postcss-loader', options: postcssOpts }
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    { loader: 'css-loader', options: { importLoaders: 1 } },
                    { loader: 'postcss-loader', options: postcssOpts },
                    'sass-loader',
                ]
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    { loader: 'css-loader', options: { importLoaders: 1 } },
                    { loader: 'postcss-loader', options: postcssOpts },
                    'less-loader'
                ]
            },
            amwWebpack.createSvgRule(),
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                use:{
                    loader:'url-loader',
                    options:{
                        limit: 10000
                    }
                }
            },
        ]
    },
    plugins: [
        //定义全局变量
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
            }
        }),
        //热替换
        new webpack.HotModuleReplacementPlugin(),
        //编译过程出错时会直接跳过，保证了输出资源不会包含错误
        new webpack.NoEmitOnErrorsPlugin(),
        //生成html
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: true
        }),
        //webpack启动后自动打开游览器
        new OpenBrowserPlugin({
            url: 'http://localhost:3000'
        }),
        new CleanWebpackPlugin(
            ['dist/app.*.js', 'dist/manifest.*.js', 'dist/app.*.css'],　 //匹配删除的文件
            {
                root: __dirname,       　　　　　　　　　　//根目录
                verbose: true,        　　　　　　　　　　//开启在控制台输出信息
                dry: false        　　　　　　　　　　//启用删除文件
            }
        )
    ],
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        port:3000,
        historyApiFallback: true, //不跳转
        inline: true, //实时刷新
        hot: true  // 启用 webpack 的模块热替换特性
    }
};

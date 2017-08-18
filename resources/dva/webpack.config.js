const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require('webpack');

module.exports = {
    entry: {
        server: './lib/server.js',
        app: './lib/client.js',
    },
    output: {
        path: __dirname + "/../../public/dva",
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: [
                    path.resolve(__dirname, 'node_modules')
                ],
                use: [
                    {
                        loader: 'react-hot-loader/webpack',
                    },
                    {
                        loader: 'babel-loader',
                    },
                ]
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            // name: '[path][name][hash].[ext]',
                            name: '[path][name].[ext]',
                            publicPath: '/dva/'
                        }
                    }
                ]
            },
            {
                test: /\.(css)$/,
                use: ExtractTextPlugin.extract({
                    use: ['css-loader', 'postcss-loader'],
                    fallback: 'style-loader',
                }),
            },
            {
                test: /\.(scss)$/,
                use: ExtractTextPlugin.extract({
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true,
                                modules: true,
                                importLoaders: 1,
                                localIdentName: '[local]_[hash:base64:5]',
                                minimize: true
                            },
                        },
                        {
                            loader: 'postcss-loader',
                        },
                        {
                            loader: 'sass-loader',
                        },
                    ],
                    fallback: 'style-loader',
                }),
            }
        ],
    },
    plugins: [
        new ExtractTextPlugin("app.css"),
        new webpack.optimize.ModuleConcatenationPlugin(),
        // new webpack.HotModuleReplacementPlugin() // 启用 HMR
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: ['polyfills', 'vendor'].reverse()
        // }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: false,

            beautify: false,
            mangle: {
                screw_ie8: true,
                keep_fnames: true
            },
            compress: {
                screw_ie8: true
            },
            comments: false
        })
    ]
}
;
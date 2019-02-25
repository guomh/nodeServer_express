var path = require('path');
let webpack = require('webpack');
let HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = function(env) {
    return {
        entry: {
            main: './app/index.js'
        },
        devtool: 'eval-source-map',
        output: {
            filename: '[name].js',
            path: path.resolve(__dirname, 'dist')
        },module: {
            rules: [{
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015'],
                        plugins: ['syntax-dynamic-import']
                    }
                }]
            }]
        },
        plugins: [
            new webpack.ProvidePlugin({
                ENV: "./"+ (process.env.NODE_ENV || "dev")+".js"
            }),
            new HtmlWebpackPlugin({
                filename: 'index.html',
                template: 'app.html',
                inject: true,
                minify: {
                    removeComments: true,
                    collapseWhitespace: true,
                    removeAttributeQuotes: true
                    // more options:
                    // https://github.com/kangax/html-minifier#options-quick-reference
                },
                // necessary to consistently work with multiple chunks via CommonsChunkPlugin
                chunksSortMode: 'dependency'
            }),
            new webpack.optimize.CommonsChunkPlugin({
                name: ['vendor', 'manifest']  // 指定公共 bundle 的名字。
            })

        ]
    }
}
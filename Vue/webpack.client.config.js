var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.config')

const ExtractTextPlugin = require('extract-text-webpack-plugin')
const isProduction = process.env.NODE_ENV === 'production';
const vueCSS = new ExtractTextPlugin({ filename: 'vue.css' });
const otherCSS = new ExtractTextPlugin({ filename: 'other.css' });

var webpackConfig = merge( {
    entry: {
        app: './src/entry-client.js'
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                    css: vueCSS.extract({
                        use: 'css-loader',
                        fallback: 'vue-style-loader'
                    })
                    }
                }
            },
        ]
    }
},baseWebpackConfig)
module.exports = webpackConfig
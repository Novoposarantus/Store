const path = require('path');
var ExtractTextPlugin = require ('extract-text-webpack-plugin');

module.exports = {
    devtool: 'source-map',
    entry: ['babel-polyfill', './src/index.js'],
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'bundle.js',
        publicPath: '/build/'
    },
    module: {
        rules: [
            {
                test: /\.js/,
                use:[
                    {
                        loader: 'babel-loader',
                        options: { presets: ["env"]  },
                    }
                ]
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader'
                  })
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('styles.css')
    ]

}
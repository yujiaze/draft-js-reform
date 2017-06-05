var path = require('path')
var webpack = require('webpack')
var isDev = process.env.NODE_ENV == 'dev' || !process.env.NODE_ENV

var plugins = [
    new webpack.DllPlugin({
        context: __dirname,
        path: path.resolve(__dirname, '../build/dll/[name].manifest.json'),
        name: '[name]'
    })
]

!isDev && plugins.push(
    new webpack.optimize.UglifyJsPlugin(
        {
            compress: {
                warnings: false
            }
        }
    )
)

module.exports = {
    entry: {
        vendor: [
            'react',
            'react-dom',
            'mobx-react',
            'mobx',
            'jquery'
        ]
    },
    output: {
        filename: '[name].dll.js',
        path: path.resolve(__dirname, '../build/dll/'),
        library: "[name]"
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: process.env.NODE_ENV == 'production' ? 'strip-loader?strip[]=debug,strip[]=console.log' : 'babel-loader'
            },
            // {
            //     test: /\.css$/,
            //     loaders: [
            //         'style-loader?sourceMap',
            //         'css-loader'
            //     ]
            // },
            // {
            //     test: /\.(ttf|eot|svg|woff|woff2)(\?[a-z0-9\-#]+)?$/,
            //     loader: "url-loader?mimetype=application/font-woff&name=styles/fonts/[hash:base64:5]__[name].[ext]"
            // }
        ]
    },
    plugins: plugins
}
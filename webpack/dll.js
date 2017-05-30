var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: {
        vendor: [
            'react',
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
                loader: process.env.NODE_ENV == "production" ? "strip-loader?strip[]=debug,strip[]=console.log" : "babel-loader"
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

    plugins: [
        new webpack.DllPlugin({
            path: path.resolve(__dirname, '../build/dll/[name].manifest.json'),
            name: "[name]"
        }),
        // new webpack.optimize.UglifyJsPlugin(
        //     {
        //         minimize: true,
        //         output: {comments: false}
        //     }
        // ),
    ]
};
const webpack = require('webpack')

const PUBLIC_PATH = '/build/'

var production = require('./base')(PUBLIC_PATH)


production[0].plugins.push(
    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        }
    })

)

module.exports = production
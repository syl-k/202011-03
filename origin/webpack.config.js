const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

module.exports = {
    mode: 'development',
    entry: [
        // './src/index.ts',
        './src/app.js',
        './src/three-vrm.js'
    ],
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/
            }
            // ,
            // {
            //     test: /\.ts$/,
            //     use: "ts-loader"
            // }
        ]
    },
    // resolve: {
    //     extensions: [".ts", ".js"]
    // },
    devServer: {
        contentBase: './dist',
        overlay: true,
        hot: true
    },
    plugins: [
        new CopyWebpackPlugin({
           patterns: ['index.html']
       }),
       new webpack.HotModuleReplacementPlugin()
    ]
};
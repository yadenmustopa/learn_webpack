const webpack = require("webpack");
const path = require("path");
const MiniCssExtractPlugin = require("mini");
const { resolve } = require("path");

const config = {
    entry : "./src/index.js",
    outhput : {
        path : path.resolve(__dirname,'dist'),
        filename : '[name].[contenthash].js'
    },
    module : {
        rules : [
            {
                test:/\.svelte$/,
                loader :'svelte-loader',
                options : {
                    preprocess : require('svelte-preprocess')({ postcss : true })
                }
            },
            {
                test : /\.js$/,
                use : 'babel-loader',
                exclude : /node_modules/
            },
            {
                test : /\.css$/,
                use : [
                    MiniCssExtractPlugin.loader,
                    {
                        loader : 'css-loader',
                        options : {
                            importLoaders : 1
                        }
                    },
                    'postcss-loader'
                ]
            },
            {
                test : /\.scss$/,
                use : [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            },
            { 
                test : /\.svg$/,
                use : 'file-loader'
            },
            {
                test: /\.png$/,
                use: [
                  {
                    loader: 'url-loader',
                    options: {
                      mimetype: 'image/png'
                    }
                  }
                ]
            }
        ]
    },
    resolve : {
        extensions : [
            '.mjs',
            '.js',
            '.svelte'
        ]
    },
    plugins : [
        new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/,/en/),
        new  MiniCssExtractPlugin()
    ],
    optimization : {
        runtimeChunk : 'single',
        splitChunks : {
            cacheGroups : {
                vendor : {
                    test : /[\\/]node_modules[\\/]/,
                    name : 'vendors',
                    chunks : 'all'
                }
            }
        }
    }
}

module.exports = config;
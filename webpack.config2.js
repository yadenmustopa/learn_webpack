const webpack = require("webpack");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { resolve } = require("path");

const config = {
    entry : "./src/index.js",
    output : {
        filename: '[name].js',
        path: __dirname + '/build',
        chunkFilename: '[id].[chunkhash].js'
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
        new  MiniCssExtractPlugin(),
        // new HtmlWebpackPlugin({
        //     // templateContent : ({ HtmlWebpackPlugin }) => "<!DOCTYPE html> <html><head><meta charset='utf-8'><title>" + HtmlWebpackPlugin.options.title + "</title></head> <body></body></html>",
        //     // filename : 'index.html'
        // })
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
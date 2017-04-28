const combineLoaders = require('webpack-combine-loaders'),
      webpack = require('webpack'),
      ExtractTextPlugin = require('extract-text-webpack-plugin'),
      OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin'),
      webpackUglifyJsPlugin = require('webpack-uglify-js-plugin'),
      HtmlWebpackPlugin = require('html-webpack-plugin'),
      CopyWebpackPlugin = require('copy-webpack-plugin');

// Author: Remco van der Heijden
// Used for production builds only
module.exports = {  
  resolve: {
    extensions: ['.js', '.jsx', '.css']
  },
  entry: [__dirname+'/src/main'],
  output: {
    path: __dirname + '/docker/dist',
    filename: 'bundle.js',
    publicPath: ''
  },

  node: {
          net: 'empty',
          tls: 'empty',
          fs: 'empty'
        },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: JSON.stringify({
          presets: ['es2015', 'stage-0', 'react']
        })
      }, {
            test: /\.css$/,
            exclude: [/node_modules/, /src\/assets/],
            loader: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: 'css-loader?sourceMap&modules&localIdentName=[name]__[id]___[hash:base64:5]'
            })
        }, {
            test: /\.css$/,
            exclude: [/node_modules/, /src\/app/],
            loader: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: 'css-loader?sourceMap&localIdentName=[name]__[id]___[hash:base64:5]'
            })
        }, {
          test   : /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
          loader : 'file-loader'
        }
    ]
  },
  plugins: [
      // Set process environment
      new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: JSON.stringify('production')
        }
      }),

      // Exports all css files into one bundle file
      new ExtractTextPlugin({filename: 'app.css' ,allChunks: true}),

      // Minifies css assets
      new OptimizeCssAssetsPlugin(),

      // Uglify javascript files
      new webpackUglifyJsPlugin({
        cacheFolder: __dirname + '/',
        debug: true,
        minimize: true,
        sourceMap: false,
        output: {
            comments: false
        },
        compressor: {
            warnings: false
        }
    }),
    
    // Copy all public files to dist
    new CopyWebpackPlugin([{
        from: __dirname + '/src/public',
        to: __dirname + '/docker/dist'
      }]),

    // Copies index.html, injects css/js and minifies html
    new HtmlWebpackPlugin({
        template: __dirname+'/src/public/index.html',
        minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true
      }
    })
  ]
};
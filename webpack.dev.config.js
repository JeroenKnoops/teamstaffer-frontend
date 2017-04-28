const combineLoaders = require('webpack-combine-loaders'),
      webpack = require('webpack');
      HtmlWebpackPlugin = require('html-webpack-plugin');

// Author: Remco van der Heijden
// Used for development only
module.exports = {  
  resolve: {
    extensions: ['.js', '.jsx']
  },
  entry: ['webpack-hot-middleware/client', './src/main'],
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js',
    publicPath: '/'
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
          presets: ['es2015', 'stage-0', 'react', 'react-hmre']
        })
      }, {
          test: /\.css$/,
          loader: combineLoaders([ 
            {
              loader: 'style-loader'
            }, {
              loader: 'css-loader',
              query: {
                  modules: true,
                  localIdentName: '[name]__[id]___[hash:base64:5]'
                }
            }
            ])
      }, {
          test: /\.csss$/,
          loader: combineLoaders([ 
            {
              loader: 'style-loader'
            }, {
              loader: 'css-loader',
              query: {
                  modules: false,
                  localIdentName: '[name]__[id]___[hash:base64:5]'
                }
            }
            ])
      }, {
        test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)|\.svg($|\?)/,
        loader: 'url-loader'
    }
    ]
  },
  plugins: [
    // Enables hot module loading
    new webpack.HotModuleReplacementPlugin(),

    // Copies index.html, injects css/js and minifies html
    new HtmlWebpackPlugin({
        template: './src/public/index.html'
    })
  ]
};
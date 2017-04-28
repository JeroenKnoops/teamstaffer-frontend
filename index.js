const express = require('express'),
      request = require('request');
let server = express();
 
const webpack = require('webpack'),
    webpackConfig = require('./webpack.dev.config.js'),
    compiler = webpack(webpackConfig);

const port = 3000;

  server.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath
  }));

  server.use(require('webpack-hot-middleware')(compiler));
  server.use(express.static('src/public'))

// Proxy configuration to remove cors problems and static urls in frond-end
server.use('/engine/*', function(req, res) {
  var url = 'http://localhost:8080'+ req.originalUrl;
  console.log('Proxy debug: '+url);
  var r = null;
  if(req.method === 'POST') {
     r = request.post({uri: url, json: req.body});
  } else {
     r = request(url);
  }
  req.pipe(r).pipe(res);
});

server.use('/api/*', function(req, res) {
  var url = 'http://localhost:8080'+ req.originalUrl;
  console.log('Proxy debug: '+url);
  var r = null;
  if(req.method === 'POST') {
     r = request.post({uri: url, json: req.body});
  } else {
     r = request(url);
  }
  req.pipe(r).pipe(res);
});

server.use('/oauth/token', function(req, res) {
  var url = 'http://localhost:8080'+ req.originalUrl;
  console.log('Proxy debug: '+url);
  var r = null;
  if(req.method === 'POST') {
     r = request.post({uri: url, json: req.body});
  } else {
     r = request(url);
  }
  req.pipe(r).pipe(res);
});

  server.listen(port, (err) => {

    if(err) {
        console.error(err);
    } else {
        console.log("Development server is listening at port %s", port);
    }
  });
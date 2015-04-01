var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var OAuth2 = require('oauth').OAuth2;
var config = require('./config/config');
var auth = require('./config/auth');

var app = express();

// listen on port
var server = app.listen(config.port, function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('App listening at http://%s:%s', host, port);
});

// connect mongodb
var uristring = config.db.uristring;

mongoose.connect(uristring, function(err, res) {
  if (err) {
    console.log('ERROR connecting to:', uristring, '.\n', err);
  } else {
    console.log('Succeeded connecting to:', uristring);
  }
});

// connect twitter
var oauth2 = new OAuth2(
  auth.twitterAuth.consumerKey,
  auth.twitterAuth.consumerSecret,
  'https://api.twitter.com/',
  null,
  'oauth2/token',
  null
);

module.exports.oauth2 = oauth2;

// bodyParser and api routes
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(require('./api'));


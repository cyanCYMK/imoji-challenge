var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
// var twitterAPI = require('node-twitter-api');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var OAuth2 = require('oauth').OAuth2;
var config = require('./config/config');
var auth = require('./config/auth');
var https = require('https');

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
// var keySecret = auth.twitterAuth.consumerKey + ':' + auth.twitterAuth.consumerSecret;
// var encodedKey = new Buffer(keySecret).toString('base64');
// console.log('encode:', encodedKey);

oauth2.getOAuthAccessToken(
  '',
  {'grant_type': 'client_credentials'},
  function(e, access_token, refresh_token, results) {
    if (e) {
      console.log('oauth2 error:', e);
    } else {
      console.log('bearer:', access_token);

      // oauth2.get(
      //   'https://api.twitter.com/1.1/trends/place.json?id=1',
      //   access_token, function(e, data, res) {
      //     if (e) return console.log(e, null);
      //     if (res.statusCode != 200 ) {
      //       return console.log(new Error('OAuth2 request failed:', res.statusCode));
      //     }
      //     try {
      //       data = JSON.parse(data);
      //     }
      //     catch(e) {
      //       return console.log(e, null);
      //     }
      //     return console.log(e, data);
      //   }
      // )

      // generate new session
      app.use(session({
        secret: access_token,
        resave: false,
        saveUninitialized: true,
        store: new MongoStore({ mongooseConnection: mongoose.connection })
      }));

      app.use(require('./api'));
    }
  }
);

// bodyParser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));




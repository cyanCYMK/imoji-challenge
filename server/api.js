var express = require('express');
var router = express.Router();
var https = require('https');
var url = require('url');
var oauth2 = require('./app').oauth2;
var Trend = require('./model');
var request = require('superagent');

// Gets all trending topics
// Optional query string performs 'startsWith' case insensitve search
router.get('/birdie/rest/topics', function(req, res) {
  var queryData = url.parse(req.url, true).query;

  if (queryData.query !== undefined) {
    var regexName = new RegExp('^' + queryData.query, 'i');
    Trend.find({ name: regexName }, function(err, trend) {
      if (err) { return console.log('Error finding trend:', err) }
      return res.json(200, trend);
    });
  } else {
    Trend.find(function(err, trends) {
      if (err) { return console.log('Error getting trends:', err) }
      return res.status(200).json(trends);
    });
  }
});

// Adds trending topic to server
// req.body = {name: 'topic to add'}
router.post('/birdie/rest/topic', function(req, res) {
  Trend.create({ name: req.body.name }, function(err, trend) {
    if (err) { return console.log('Error writing new trend:', err) }
    return res.status(201).json(trend);
  });
});

// Removes trending topic from server
// req.body = {name: 'topic to delete'}
router.delete('/birdie/rest/topic', function(req, res) {
  Trend.remove({ name: req.body.name }, function(err) {
    if (err) { return console.log('Error removing trend:', err) }
    return res.status(204).end();
  });
});

// Loads trending topics from Twitter and updates data store
router.post('/birdie/rest/topics/load', function(req, res) {
  oauth2.getOAuthAccessToken(
    '',
    {'grant_type': 'client_credentials'},
    function(e, access_token, refresh_token, results) {
      if (e) {
        console.log('oauth2 error:', e);
      } else {
        // console.log('bearer:', access_token);
        request
          .get('https://api.twitter.com/1.1/trends/place.json?id=1')
          .set('Authorization', 'Bearer ' + access_token)
          .end(function(err, res){
            // console.log('TRENDS:', res.body[0].trends);
            var trends = res.body[0].trends;
            trends.forEach(function(trend) {
              Trend.create({ name: trend.name });
            });
          });

        res.send(201);
      }
    }
  );
});

module.exports = router;

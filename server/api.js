var express = require('express');
var router = express.Router();
var https = require('https');
var url = require('url');
var oauth2 = require('./app');
var Trend = require('./model');


// Gets all trending topics
// TODO: Searches topics by supplied query string
// 'startsWith' case insensitive search
// ex: /birdie/rest/topics?query=hi
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
  if (!req.session) {
    return next(new Error('No session'));
  }
  console.log('req.session:', req.session);

  // https.get('https://api.twitter.com/1.1/trends/place.json?id=1', function(res){
  //   res.on('data', function(d) {
  //     process.stdout.write(d);
  //   })
  // })
  res.send('');
});

module.exports = router;

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TrendSchema = new Schema({
  name: String
});

module.exports = mongoose.model('Trend', TrendSchema);

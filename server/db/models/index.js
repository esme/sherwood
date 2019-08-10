var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var stockSchema = new Schema({
  symbol: String,
  timeSeries: {
    timeStamp: String,
    open: String,
    high: String,
    low: String,
    close: String,
    volume: String,
  },
});

var Stock = mongoose.model('Stock', stockSchema);

module.exports = {
  Stock
};
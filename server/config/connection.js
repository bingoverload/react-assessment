const mongoose = require('mongoose')
require('dotenv').config()

mongoose.connect(process.env.MONGOKEY || 'mongodb://localhost/projectHR', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = mongoose.connection;
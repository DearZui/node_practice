var mongoose = require('mongoose');
var MovieSchena = require('../schemas/movie')
var Movie = mongoose.model('Movie', MovieSchena);

module.exports = Movie;
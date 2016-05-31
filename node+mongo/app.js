var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var user = require('http');
var path = require('path');
var mongoose = require('mongoose');

var app = express();

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

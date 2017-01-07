var hydraExpress = require('fwsp-hydra-express');
var config = require('./config.json');

function onRegisterRoutes() {
  var express = hydraExpress.getExpress();
  var api = express.Router();

  api.get('/', function(req, res) {
    res.send('Hello World!');
  });
  hydraExpress.registerRoutes({
    '': api
  });
}

hydraExpress.init(config, onRegisterRoutes);  

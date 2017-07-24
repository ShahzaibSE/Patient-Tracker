'use strict';

var SwaggerExpress = require('swagger-express-mw');
var app = require('express')();
const mongoose = require('mongoose');
module.exports = app; // for testing

const mongodb_config = require('./dbConfig.js');

//--------------- Mongodb Snippet -----------------//
// mongoose.connect('mongodb://shahzaib:zx112233@patient-tracker-shard-00-00-seewv.mongodb.net:27017,patient-tracker-shard-00-01-seewv.mongodb.net:27017,patient-tracker-shard-00-02-seewv.mongodb.net:27017/<DATABASE>?ssl=true&replicaSet=patient-tracker-shard-0&authSource=admin')
// mongoose.connect(mongodb_config.dbConfig.connection_atlas);  //Mongodb Atlas Connection.
mongoose.connect(mongodb_config.dbConfig.connection_mlab);  //Mongodb MLab Connection.
// mongoose.connect(mongodb_config.dbConfig.localhost_connection); //Mongodb local connection.

mongoose.connection.on('connected',function(){
  console.log("Mongodb connection is running :-)");
});

mongoose.connection.on('error',function(err){
  console.log("Error occured while connecting with mongodb atlas.");
  console.log(err);
});
//-------------------------------------------------//

var config = {
  appRoot: __dirname // required config
};

SwaggerExpress.create(config, function(err, swaggerExpress) {
  if (err) { throw err; }

  // install middleware
  swaggerExpress.register(app);

  var port = process.env.PORT || 10010;
  app.listen(port);

  if (swaggerExpress.runner.swagger.paths['/hello']) {
    console.log('try this:\ncurl http://127.0.0.1:' + port + '/hello?name=Scott');
  }
});

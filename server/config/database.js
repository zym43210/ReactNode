const mongoose = require('mongoose');

//require chalk module to give colors to console text
const chalk = require('chalk');

//require database URL from properties file
const dbURL = require('./properties').DB;

const connected = chalk.bold.cyan;
const error = chalk.bold.yellow;
const disconnected = chalk.bold.red;
const termination = chalk.bold.magenta;

//export this function and imported by server.js
module.exports =function(){

    const config = {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      };
    mongoose.connect(dbURL,config);

    mongoose.connection.on('connected', function(){
        console.log(connected("Mongoose default connection is open to ", dbURL));
    });

    mongoose.connection.on('error', function(err){
        console.log(error("Mongoose default connection has occured "+err+" error"));
    });

    mongoose.connection.on('disconnected', function(){
        console.log(disconnected("Mongoose default connection is disconnected"));
    });

    process.on('SIGINT', function(){
        mongoose.connection.close(function(){
            console.log(termination("Mongoose default connection is disconnected due to application termination"));
            process.exit(0)
        });
    });
}
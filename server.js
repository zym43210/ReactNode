var express = require('express');
var log = require('morgan')('dev');
var bodyParser = require('body-parser');

var properties = require('./server/config/properties');
var db = require('./server/config/database');
//hero routes
var productsRoutes = require('./server/controllers/api/routes/productsRoutes');
var usersRoutes = require('./server/controllers/api/routes/usersRoutes');
var app = express();

//configure bodyparser
var bodyParserJSON = bodyParser.json();
var bodyParserURLEncoded = bodyParser.urlencoded({extended:true});

//initialise express router


// call the database connectivity function
db();

// configure app.use()
app.use(log);
app.use(bodyParserJSON);
app.use(bodyParserURLEncoded);

// Error handling


// use express router
app.use('/api/products',productsRoutes);
app.use('/api/users',usersRoutes);
//call heros routing


// intialise server
app.listen(properties.PORT, (req, res) => {
    console.log(`Server is running on ${properties.PORT} port.`);
})
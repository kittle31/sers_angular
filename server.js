// set up ========================
var express  = require('express');
var port     = 8081;
var app      = express(); 								// create our app w/ express
var mongoose = require('mongoose'); 					// mongoose for mongodb
var morgan = require('morgan'); 			// log requests to the console (express4)
var bodyParser = require('body-parser'); 	// pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
var database = 'mongodb://localhost/sers'

// configuration =================
mongoose.connect(database);   // connect to mongoDB database on modulus.io

app.use(express.static(__dirname + '/public')); 				// set the static files location /public/img will be /img for users
app.use(morgan('dev')); 										// log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'})); 			// parse application/x-www-form-urlencoded
app.use(bodyParser.json()); 									// parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

var route = require('./app/routes');
var model = require('./app/model')(mongoose);
// call the router to load everything up
// also loads the controllers
route.init(app, model);

// listen (start app with node server.js) ======================================
app.listen(port);
console.log("App listening on port "+port);

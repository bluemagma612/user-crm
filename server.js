// Base Setup
//============================================

// Call the packages
var express = require('express'), // call express
	app = express(), // define our app using express
	bodyParser = require('body-parser'), // get body-parser
	morgan = require('morgan'), // used to see requests
	mongoose = require('mongoose'), // for working with our db
	config = require('./config');
	path  = require('path');

// APP configuration
// Use body-parser so we can grab information from POST requests
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//configure our app to handle CORS requests
app.use(function(req,res,next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization');
	next();
});

// log all requests to the console
app.use(morgan('dev'));

// connect to our database
mongoose.connect(config.database);

// set static files location
// used for requests 
app.use(express.static(__dirname + '/public'));

// API Routes
var apiRoutes = require('./app/routes/api')(app, express);
app.use('/api', apiRoutes)

// basic route for the home page
app.get('*', function(req,res) {
	res.sendFile(path.join(__dirname + '/public/app/views/index.html'));
});




// START THE SERVER
//=====================================================
app.listen(config.port);
console.log('Magic happens on port ' + config.port);



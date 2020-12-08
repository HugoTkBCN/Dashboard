/**
* Module dependencies.
*/
var express = require('express')
  , bcrypt = require('bcrypt')
  , mysql = require('mysql')
  , request = require('request')
  , bodyParser = require('body-parser')
  , cors = require('cors');

var randtoken = require('rand-token');

var user = require('./auth/user'),
    token = require('./auth/token'),
    google = require('./auth/google');

var weather = require('./api/weather'),
    imdb = require('./api/imdb'),
    exchange = require('./api/exchange'),
    steam = require('./api/steam'),
    reddit = require('./api/reddit'),
    pornhub = require('./api/pornhub'),
    covid = require('./api/covid');

var widget = require('./widget/widget'),
    about = require('./widget/about');

var app = express();

//Connection MySQL
var connection = mysql.createConnection({
    host     :  process.env.MYSQL_HOST_IP,
    user     :  process.env.MYSQL_USER,
    password :  process.env.MYSQL_PASSWORD,
    database :  process.env.MYSQL_DATABASE
  });
 
connection.connect((err) => {
    if (err) {
        console.error('error connecting mysql: ', err);
    } else {
        console.log('mysql connection successful');
        app.listen(process.env.REACT_APP_SERVER_PORT, (err) => {
            if (err) {
                console.error('Error starting  server', err);
            } else {
                console.log('server listening at port ' + process.env.REACT_APP_SERVER_PORT);
            }
        });
    }
});

// Set global var
global.db = connection;
global.bcrypt = bcrypt;
global.request = request;
global.randtoken = randtoken;
 
// all environments
app.set('port', process.env.REACT_APP_SERVER_PORT || 8080);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({credentials: true}));

// home page
app.get('/', (req, res) => {
	res.json({
		success: true,
		message: 'Server Running'
	});
});

//about json
app.get('/about.json', about.about);// Get ajout.json

//Token
app.post('/getToken', token.getToken); // Get token to use the server
app.post('/checkToken', token.checkToken); // Check if token is valid

//Auth
app.post('/signup', user.signup);//call for signup post 
app.post('/login', user.login);//call for login post
app.post('/google', google.officeAuth);

//Widget
app.post('/addWidget', widget.add);// Add Widget
app.post('/getWidget', widget.get);// Get Widget by type for a user
app.post('/getAllWidget', widget.getAll);// Get all Widget for a user
app.post('/updateWidget', widget.update);// Update widget by id
app.post('/removeWidget', widget.remove);// Remove widget by id

//API
app.post('/weather', weather.getWeather);// Get weather for a city
app.post('/imdb', imdb.getMovie);// Get movie list by name
app.post('/exchange', exchange.getCurrency);// Get currency of money comparated to N others
app.get('/steamStatus', steam.getStatus);// Get steam server status
app.post('/getSubReddit', reddit.getSubRedit);// Get N last post from X Subreddit
app.post('/pornhub', pornhub.get); // Get pornhub videos by keyword and sort by "Most Recent" | "Most Viewed" | "Top Rated" | "Longest"
app.post('/covid', covid.getCovidStat); // Get covid statistic by country

//Error 404
app.get('*', function(req, res) {
    res.status(404).send('Error 404 : Not found');
});
app.post('*', function(req, res) {
    res.status(404).send('Error 404 : Not found');
});
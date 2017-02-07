const express = require('express');
const logger = require('morgan');
const fs = require('fs');
const methodOverride = require('method-override');
const nunjucks = require('nunjucks');
const bodyParser = require('body-parser');
const db = require('./db');
const path = require('path');
const routes = require('./routes/categories.js');


const app = express(); // creates an instance of the express application
app.set('view engine', 'html'); // have res.render work with html files
app.engine('html', nunjucks.render); // when giving html files to res.render, tell it to use nunjucks
nunjucks.configure('views', {noCache: true}); // point nunjucks to the proper directory for templates

/* Set up body parser */

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

/* Listen on port 3000 */
var portSetting = process.env.PORT || 3000;
app.listen(portSetting, function(){
  console.log("Listening on port " + portSetting);
});

/* Create logger */

var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags:'a'});
app.use(logger('combined', {stream:accessLogStream}));

/* Set up routes */

app.use(methodOverride('_method'));
app.use('/node_modules', express.static('./node_modules'));
app.use('/', routes);

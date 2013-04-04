var allowCrossDomain = function(req, res, next){
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

  // intercept OPTIONS method
  if ('OPTIONS' == req.method) {
    res.send(200);
  }
  else if ( 'POST' == req.method ){
    console.log(req);
    next();
  }
  else {
    next();
  }
};

/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , events = require('./routes/events')
  , http = require('http')
  , path = require('path')
  , bcrypt = require("bcrypt") //hashing algorithm
  , orm = require('orm')
  , config = require('./config');

config.set('db_host', 'mysql://root:root@localhost:8889/FoxCode');
config.set('url_models', './models/models');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3001);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(allowCrossDomain);
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/users/:userid', user.get);
app.get('/users/:userid/events', user.getEvents);
app.get('/users/:userid/events/categories', user.getEventCategories);
app.get('/users/:userid/events/:eventid', user.getEvent);
app.get('/users/:userid/events/:time1/:time2', user.getEvents);
app.get('/events', events.list);
app.get('/events/:time1/:time2', events.getInInterval);
app.get('/events/categories', events.getCategories);
app.get('/events/types', events.getTypes);
app.get('/events/:eventid', events.get);
//app.post('/users/:username/:password', user.login);
app.post('/users', user.create);
app.post('/users/:userid/events', user.addEvent);
app.post('/users/:userid/events/:eventid', user.modifyEvent);
app.post('/events/categories', events.createCategory);
app.post('/events/types', events.createType);
app.delete('/users/:userid/events/:eventid', user.deleteEvent);

//loading and syncing application models
orm.connect(config.get("db_host"), function(err, db){   
  if(err) throw err;

  db.load(config.get("url_models"), function(err){
    if(err) throw err;

    console.log("Models successfully loaded");
  });
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

var allowCrossDomain = function(req, res, next){
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

  // intercept OPTIONS method
  if ('OPTIONS' == req.method) {
    res.send(200);
  }
  else if ( 'POST' == req.method ){
    next();
  }
  else {
    next();
  }
};

var checkAuth = function(req, res, next){
  console.log(req.session);
  console.log(req.cookies);
  if(!req.session.username && req.url != "/users/login"){
    //res.send(401);
    next();
  }
  else{
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
  , config = require('./config')
  , Sequelize = require('sequelize-mysql').sequelize
  , mysql = require('sequelize-mysql').mysql
  , datamodelManager = require('./modules/DatamodelManager/DatamodelManager');

config.set('db_host', 'mysql://root:root@localhost:8889/FoxCode');
config.set('url_models', './models/models');

for(var key in datamodelManager){
  console.log(key);
}

var app = express();
var MemoryStore = express.session.MemoryStore;

app.configure(function(){
  app.set('port', process.env.PORT || 3001);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(allowCrossDomain);
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.cookieSession({ secret: 'keyboard cat', key: 'sid'}));
  /*app.use(express.session({
    secret: 'keyboard cat',
    store: new MemoryStore({ reapInterval: 60000 * 10 })
  }));*/
  //app.use(checkAuth);
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));

});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/users', checkAuth, user.list);
app.get('/users/:userid', checkAuth, user.get);
app.get('/users/:userid/events', checkAuth, user.getEvents);
app.get('/users/:userid/events/categories', checkAuth, user.getEventCategories);
app.get('/users/:userid/events/:eventid', checkAuth, user.getEvent);
app.get('/users/:userid/events/:time1/:time2', checkAuth, user.getEvents);
app.get('/events', checkAuth, events.list);
app.get('/events/:time1/:time2', checkAuth,events.getInInterval);
app.get('/events/categories', checkAuth, events.getCategories);
app.get('/events/types', checkAuth, events.getTypes);
app.get('/events/:eventid', checkAuth, events.get);
app.post('/users/login', checkAuth, user.login);
app.post('/users', checkAuth, user.create);
app.post('/users/:userid/events', checkAuth, user.addEvent);
app.post('/users/:userid/events/categories', checkAuth, user.addEventCategory);
app.post('/users/:userid/events/:eventid', checkAuth, user.modifyEvent);
app.post('/events/categories', checkAuth, events.createCategory);
app.post('/events/types', checkAuth, events.createType);
app.delete('/users/:userid/events/:eventid', checkAuth, user.deleteEvent);

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

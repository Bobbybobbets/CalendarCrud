var orm = require('orm');

/*
  Get event list
 */

exports.list = function(req, res){
  orm.connect("mysql://root:root@localhost:8889/FoxCode", function(err, db){
    db.load('./models/models', function(err){});

    db.models.Events.find({}, function(err, events){
      res.send({events : events});
    });
  });
};

exports.get = function(req, res){
  orm.connect("mysql://root:root@localhost:8889/FoxCode", function(err, db){
    db.load('./models/models', function(err){});

    var eventID = req.params.eventid;

    db.models.Events.get(eventID, function(err, event){
      if(!err){
        res.send({event : event});
      }
      else{
        res.send(404);
      }
    });
  });
};
/*
  Get events between timespan
 */

exports.getInInterval = function(req, res){
  orm.connect("mysql://root:root@localhost:8889/FoxCode", function(err, db){
    db.load('./models/models', function(err){});
    
    var time1 = parseInt(req.params.time1);
    var time2 = parseInt(req.params.time2);

    if(isNaN(time1)){
      console.log("time1 is undefined");
      time1 = new Date(0);
    }
    else{
      time1 = new Date(time1);
    }

    if(isNaN(time2)){
      console.log("time1 is undefined");
      time2 = new Date();
    }
    else{
      time2 = new Date(time2);
    }

    db.models.Events.find({
      EventDate : orm.between(time1, time2)
    }, function(err, userEvents)
    {
      res.send({user_events : userEvents});
    });
  });
};

exports.getCategories = function(req, res){
  orm.connect("mysql://root:root@localhost:8889/FoxCode", function(err, db){
    db.load('./models/models', function(err){});

    db.models.Category.find({}, function(err, categories){
      res.send({categories : categories});
    });
  });
};

exports.getTypes = function(req, res){
  orm.connect("mysql://root:root@localhost:8889/FoxCode", function(err, db){
    db.load('./models/models', function(err){});

    db.models.Type.find({}, function(err, types){
      res.send({types : types});
    });
  });
};

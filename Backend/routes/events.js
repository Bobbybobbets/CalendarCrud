var orm = require('orm');

/*
  Get event list
 */

exports.list = function(req, res){
  orm.connect("mysql://root:root@localhost:8889/FoxCode", function(err, db){
    db.load('./models/models', function(err){});

    db.models.Event.find({}, function(err, events){
      res.send({events: events});
    });
  });
};

exports.get = function(req, res){
  orm.connect("mysql://root:root@localhost:8889/FoxCode", function(err, db){
    db.load('./models/models', function(err){});

    var eventID = req.params.eventid;

    db.models.Event.get(eventID, function(err, event){
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

    if(!isNaN(time1)){
      time1 = new Date(time1);
    }

    if(!isNaN(time2)){
      time2 = new Date(time2);
    }

    var where = {};

    if(!isNaN(time1) && !isNaN(time2))
    {
      where.StartDate = orm.between(time1, time2);
    }

    db.models.Event.find(
      where, 
      function(err, userEvents){
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

exports.createCategory = function(req, res){
  orm.connect("mysql://root:root@localhost:8889/FoxCode", function(err, db){
    db.load('./models/models', function(err){console.log(err);});

    var newCategory = new db.models.Category({
      CategoryName : req.body.category_name,
      CreatedDate : new Date(),
      LastChangedDate : new Date()
    });

    newCategory.save(function(err){
      if(err)console.log(err);
    });

    db.sync(function(err){
      if(err) console.log(err);
      else{
        res.send({Category : newCategory});
      }
    });
  });
};

exports.createType = function(req, res){
  orm.connect("mysql://root:root@localhost:8889/FoxCode", function(err, db){
    db.load('./models/models', function(err){});

    var newType = new db.models.Type({
      TypeName : req.body.type_name,
      CreatedDate : new Date(),
      LastChangedDate : new Date()
    });

    newType.save(function(err){
      if(err)console.log(err);
    });

    db.sync(function(err){
      if(err) console.log(err);
      else{
        res.send({Type : newType});
      }
    });
  });
};


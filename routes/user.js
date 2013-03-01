var orm = require("orm");


/*
 * GET users listing.
 */

exports.list = function(req, res){
  orm.connect("mysql://root:root@localhost:8889/FoxCode", function(err, db){
    db.load('./models/models', function(err){});

    db.models.User.find({}, function(err, users){
      res.send({'users' : users});
    });
  });
};


/*
  Get on user
 */

exports.get = function(req, res){
  orm.connect("mysql://root:root@localhost:8889/FoxCode", function(err, db){
    db.load('./models/models', function(err){});

    db.models.User.get(req.params.userid, function(err, user){
      if(!err){
        res.send(user);
      }
      else{
        res.send(404);
      }
    });
  });
};


exports.getEvents = function(req, res){
  orm.connect("mysql://root:root@localhost:8889/FoxCode", function(err, db){
    db.load('./models/models', function(err){});

    var userid = req.params.userid;
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

    console.log(time1);
    console.log(time2);
    db.models.User.get(userid, function(err, user){
      db.models.Events.find({
        UserFK : user.id,
        EventDate : orm.between(time1, time2)
      }, function(err, userEvents)
      {
        res.send({user_events : userEvents});
      });
    });
  });
};

/*
  Create new user
 */
exports.create = function(req, res)
{
  var newUser = new User({
    FirstName : req.body.firstname,
    LastName : req.body.lastname,
    CreatedDate : new Date(),
    LastChangedDate : new Date()
  });

  newUser.save(function(err){
    console.log("User created", err);
  });

  db.sync(function(err){
    if(err) throw err;
  });
};

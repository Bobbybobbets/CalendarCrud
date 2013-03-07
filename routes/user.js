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
  orm.connect("mysql://root:root@localhost:8889/FoxCode", function(err, db){
    if(err) console.log(err);

    db.load('./models/models', function(err){
      if(err) console.log(err);
    });

    var newUser = new db.models.User({
      FirstName : req.body.first_name,
      LastName : req.body.last_name,
      CreatedDate : new Date(),
      LastChangedDate : new Date()
    });

    newUser.save(function(err){
      if(err) console.log(err);
      else console.log("User created");
    });

    db.sync(function(err){
      if(err) throw err;

      res.send({User : newUser});
    });
  });
};

exports.addEvent = function(req, res)
{
  orm.connect("mysql://root:root@localhost:8889/FoxCode", function(err, db){
    if(err) console.log(err);

    db.load('./models/models', function(err){
      if(err) console.log(err);
    });

    console.log(req.params.userid);
    var userID = req.params.userid;

    db.models.User.get(userID, function(err, user){
      if(err){
         console.log(err);
         res.send(404);
      }
      else{
        var newEvent = new db.models.Event({
          UserFK : user.id,
          CategoryFK : req.body.category,
          TypeFK : req.body.type,
          Subject : req.body.subject,
          Location : req.body.location,
          EventDate : req.body.event_date,
          Description : req.body.description,
          Important : req.body.important,
          CreatedDate : new Date(),
          LastchangedDate : new Date()
        });

        newEvent.save(function(err){
          if(err) console.log(err);
          else console.log("Event added");
        });

        db.sync(function(err){
          if(err) throw err;

          res.send({Event : newEvent});
        });
      }
    });
  });
};

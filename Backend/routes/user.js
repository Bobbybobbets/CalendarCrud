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

    if(!isNaN(time1)){
      time1 = new Date(time1);
    };

    if(!isNaN(time2)){
      time2 = new Date(time2);
    }

    var where = {
      UserFK : userid
    };

    if(!isNaN(time1) && !isNaN(time2))
    {
      where.StartDate = orm.between(time1, time2);
    }

    db.models.User.get(userid, function(err, user){
      db.models.Event.find(
        where, 
        function(err, userEvents){
          if(err) {
            console.log(err);
            res.send(404);
          }
          res.send({events : userEvents});
      });
    });
  });
};

exports.getEvent = function(req, res){
  orm.connect("mysql://root:root@localhost:8889/FoxCode", function(err, db){
    db.load('./models/models', function(err){});

    var userid = req.params.userid;
    var eventid = req.params.eventid;

    db.models.User.get(userid, function(err, user){
      db.models.Event.get(eventid, 
        function(err, userEvent){
          if(err) {
            console.log(err);
            res.send(404);
          }
          res.send({event : userEvent});
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
        console.log(req.body.start_date);
        console.log(req.body.end_date);
        console.log(new Date(req.body.start_date));
        console.log(new Date(req.body.end_date));

        var newEvent = new db.models.Event({
          UserFK : user.id,
          CategoryFK : req.body.category,
          TypeFK : req.body.type,
          Subject : req.body.subject,
          Location : req.body.location,
          StartDate : req.body.start_date,
          EndDate : req.body.end_date,
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
exports.modifyEvent = function(req, res)
{
  orm.connect("mysql://root:root@localhost:8889/FoxCode", function(err, db){
    if(err) console.log(err);

    db.load('./models/models', function(err){
      if(err) console.log(err);
    });

    console.log(req.params.userid);
    console.log("test");
    var userID = req.params.userid;
    var eventID = req.params.eventid;

    db.models.User.get(userID, function(err, user){
      if(err){
         console.log(err);
         res.send(404);
      }
      else{
        console.log(req.body.start_date);
        console.log(req.body.end_date);
        console.log(new Date(req.body.start_date));
        console.log(new Date(req.body.end_date));

        db.models.Event.get(eventID,
          function(err, event){
            event.CategoryFK = req.body.category;
            event.TypeFK = req.body.type;
            event.Subject = req.body.subject;
            event.Location = req.body.location;
            event.StartDate = new Date(req.body.start_date);
            event.EndDate = new Date(req.body.end_date);
            event.Description = req.body.description;
            event.Important = req.body.important,
            event.LastchangedDate = new Date();

            event.save(function(err){
              if(err) console.log(err);
              else console.log("Event modified");

              db.sync(function(err){
                if(err) console.log(err);

                res.send({Event : event});
              });
            });
        });
      }
    });
  });
};
exports.deleteEvent = function(req, res)
{
  orm.connect("mysql://root:root@localhost:8889/FoxCode", function(err, db){
    if(err) console.log(err);

    db.load('./models/models', function(err){
      if(err) console.log(err);
    });

    var userID = req.params.userid;
    var eventID = req.params.eventid;

    db.models.User.get(userID, function(err, user){
      if(err){
         console.log(err);
         res.send(404);
      }
      else{
        db.models.Event.get(eventID,
          function(err, event){
            event.remove(function(err){
              db.sync(function(err){
                if(err) console.log(err);
                else console.log("event deleted");
              });
            });
          });
      }
    });
  });
};



/*
 * GET users listing.
 */

exports.list = function(req, res){
  res.send("respond with a resource");
};


/*
  Get on user
 */

exports.get = function(req, res){
  db_connection.models.User.get(req.params.userid, function(err, user){
    if(!err){
      res.send(user);
    }
    else{
      res.send(404);
    }
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

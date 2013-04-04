module.exports = function(db, cb){
    db.settings.set("properties.association_key", "{name}");

    var user = db.define('User', {
        FirstName       : String,
        LastName        : String,
        Username        : String,
        Password        : {type: "text", size: 60},
        CreatedDate     : Date,
        LastChangedDate : Date
    });

    var events = db.define('Event', {
        Subject             : String,
        Location            : String,
        StartDate           : Date,
        EndDate             : Date,
        Description         : {type: "text", size: 1000},
        Important           : Boolean,
        CreatedDate         : Date,
        LastChangedDate     : Date
    },{
        autoFetch: true
    });

    var type = db.define('Type', {
        TypeName    : String,
        CreatedDate : Date,
        LastChangedDate : Date
    });

    var category = db.define('Category', {
        CategoryName    : String,
        Color           : String,
        CreatedDate     : Date,
        LastChangedDate : Date
    });

    events.hasOne("UserFK", user, {
      reverse : "Events"
    });
    events.hasOne("CategoryFK", category);
    events.hasOne("TypeFK", type);
    events.hasOne("LastChangedBy", user);
    user.hasOne("LastChangedBy", user);
    type.hasOne("LastChangedBy", user);
    category.hasOne("LastChangedBy", user);
    category.hasOne("UserFK", user);


    db.sync(function(err){
        if(err) throw err;

        console.log("Models synced with database");
    });

    return cb();
};
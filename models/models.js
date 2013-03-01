module.exports = function(db, cb){
    db.settings.set("properties.association_key", "{name}");

    var user = db.define('User', {
        FirstName       : String,
        LastName        : String,
        CreatedDate     : Date,
        LastChangedDate : Date
    });

    var events = db.define('Events', {
        Subject             : String,
        Location            : String,
        EventDate           : Date,
        Description         : {type: "text", size: 1000},
        Important           : Boolean,
        CreatedDate         : Date,
        LastChangedDate     : Date
    });

    var type = db.define('Type', {
        TypeName    : String,
        CreatedDate : Date,
        LastChangedDate : Date
    });

    var category = db.define('Category', {
        CategoryName    : String,
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

    db.sync(function(err){
        if(err) throw err;

        console.log("Models synced with database");
    });

    return cb();
};
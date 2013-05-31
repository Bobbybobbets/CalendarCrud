var seq = require("Sequelize");

module.export = function(){
    return {
        model : {
            TypeName        : seq.STRING
        },
        associations : {
            hasMany : "Event"
        }
    });
};
var seq = require("Sequelize");

module.exports = function(){
    return {
        model : {
            CategoryName        : DataTypes.STRING,
            Color               : DataTypes.STRING
        },
        associations : {
            hasMany : "Event"
        }
    });
};
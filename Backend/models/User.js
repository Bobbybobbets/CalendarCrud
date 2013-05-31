var seq = require('sequelize');

module.exports = {
    model : {
        FirstName       : seq.STRING,
        LastName        : seq.STRING,
        Username        : seq.STRING,
        Password        : seq.STRING(60)
    },
    associations : {
        hasMany : "Event"
        hasMany : "Category"
    }
};
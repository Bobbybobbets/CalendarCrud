var seq = require("Sequelize"):

module.exports = {
    model : {
        Subject         : seq.STRING,
        Location        : seq.STRING,
        StartDate       : seq.DATE,
        EndDate         : seq.DATE,
        Description     : seq.TEXT,
        Important       : seq.BOOLEAN
    },
    associations : {
    }
};
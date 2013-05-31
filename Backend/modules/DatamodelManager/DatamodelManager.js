/*
Patrice Paquette

This module expects a configuration object upon instanciation.
Searches a configurable path for model definitions and defines them using Sequelize. The resulting
objects are cached for further use in the application.

CONFIGURATION ASSUMPTIONS
modelsPath : 
    Path to the folder containing all the models. There is a 1 to 1 relationship between the models and the files that they are defined in.
    Default : "./"
hostUrl :
    Host database url 
    Default : "localhost"
hostPort :
    Host database port
    Default : 3306
hostUsername :
    Username for database
    Default : "root"
hostPassword :
    Password for database
    Default : "root"
databaseName :
    Name of the database
    Default : None
databaseDialect :
    Type of database used
    Default : "mysql"
    Supported : "sqlite", "postgres"
*/

var _ = require('underscore');
var sequelize = require('sequelize-mysql').sequelize;
var fs = require('fs');

module.exports = (function() {
    var _defaultConfig = {
        modelsPath : "./",
        hostUrl : "localhost",
        hostPort : 3306,
        hostUsername : "root",
        hostPassword : "root",
        databaseDialect : "mysql"
    };

    var _models = [];

    //constructor
    var DatamodelManager = function(config){
        var that = this;
        this.config = _.clone(_defaultConfig);
        this.config = _.extend(this.config, config);

        if(this.config.databaseName == undefined){
            throw("DatamodelManager requires a databaseName field in the configuration object");
        }

        this.sequelize = new sequelize(
            this.config.databaseName,
            this.config.hostUsername,
            this.config.hostPassword,
            {
                dialect : this.config.databaseDialect,
                port : this.config.hostPort
            }
        );

        //define models from models definitions in specified folder
        var modelsAssocBuf = [];
        fs.readdirSync(this.config.modelsPath).forEach(function(name){
            var modelDef = require(that.config.modelsPath + '/' + name);
            var model = modelDef.model;
            var associations = modelDef.associations || {};
            var options = modelDef.options || {};
            var modelName = name.replace(/\.js$/i, "");

            _models[modelName] = that.sequelize.define(modelName, model, options);
            console.log(model);

            if(associations != undefined){
                modelsAssocBuf[modelName] = associations;
            }
        });

        //adding associations to the models. Must do this after all models have been defined.
        for(var modelName in modelsAssocBuf){
            var modelAssoc = modelsAssocBuf[modelName];
            for(var assocType in modelAssoc){
                var relatedEntity = _models[modelAssoc[assocType]];
                _models[modelName][assocType](relatedEntity);
            }
        }

        //sync database with model
        this.sequelize.sync();
    };

    DatamodelManager.prototype.GetModel = function(modelName){
        return _models[modelName];
    };

    return DatamodelManager;
})();
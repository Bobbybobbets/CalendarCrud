//NOTE : DatamodelManager does not support using a mock database for testing purposes. Because of this, you need to provide a real database.

var DatamodelManager = require("../DatamodelManager");

describe("DatamodelManager", function(){
    var config = {
        modelsPath : "./spec/models",
        hostUrl : "localhost",
        hostPort : 8889,
        hostUsername : "root",
        hostPassword : "root",
        databaseName : "DatamodelManagerTest"
    };

    var dmManager = new DatamodelManager(config);

    var _models = [];


    it("Should contain a model called User", function(){
        var User = dmManager.GetModel("User");
        var nothing = dmManager.GetModel("nothing");
        
        expect(User).not.toBe(undefined);
        expect(nothing).toBe(undefined);
    });

    it("Should contain an association with Country", function(){
        var User = dmManager.GetModel("User");

        expect(User.associations.Countries).not.toBe(undefined);
    });
    
    it("Should create a new user in the database", function(){
        var User = dmManager.GetModel("User");
        User.create({
            Name    : "Patrice"
        });


        User.findAll().success(function(users){
            expect(users.length).toBe(1);

            for(id in users){
                users[id].destroy().success(function(){});
            }
        });

        User.findAll().success(function(users){
            expect(users.length).toBe(0);
        });
    });
});
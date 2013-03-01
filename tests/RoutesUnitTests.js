var should = require("should");
var routes = require("../routes");

var request = {};
var response = {};

describe("Routing", function(){
  describe("index", function(){
    it("Show index page", function(){
      routes.index(request, response);
      response.should.have.property('set');
    });
  });
});
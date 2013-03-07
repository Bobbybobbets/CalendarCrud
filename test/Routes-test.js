var APIeasy = require("api-easy"),
    assert = require("assert");

var suite = APIeasy.describe('FoxCode restful api');
var userID;
var categoryID;
var typeID;

suite.use('localhost', 3001)
        .discuss("/events/categories")
            .setHeader('Content-Type', 'application/json')
            .post('/events/categories', {
                category_name : "test"
            })
                .expect(200)
                .expect("Should have created a new category", function(err, res, body){
                    if(err) console.log(err);
                    else{
                        body = JSON.parse(body);
                        assert.equal(body.Category.CategoryName, "test");
                        categoryID = body.Category.id;
                    }
                })
            .setHeader('Content-Type', 'text/html')
            .get('/events/categories', {})
                .expect(200)
        .undiscuss().unpath()
        .discuss("/events/types")
            .setHeader('Content-Type', 'application/json')
            .post('/events/types', {
                type_name : "test"
            })
                .expect(200)
                .expect("Should have created a new type", function(err, res, body){
                    body = JSON.parse(body);
                    assert.equal(body.Type.TypeName, "test");
                })
            .setHeader('Content-Type', 'text/html')
            .get('/events/types', {})
                .expect(200)
        .undiscuss().unpath()
        .discuss("/users")
            .setHeader('Content-Type', 'application/json')
            .post('/users', {
                first_name : "test",
                last_name : "test"
            })
                .expect(200)
                .expect("Should have created new user", function(err, res, body){
                    body = JSON.parse(body);
                    assert.equal(body.User.FirstName, "test");
                    assert.equal(body.User.LastName, "test");
                    userID = body.User.id;
                })
            .post('/users/1/events', {
                subject : "test",
                location : "test",
                event_date : new Date(),
                description : "test",
                important : true,
                category : 1,
                type : 1
            })
                .expect(200)
                .expect("Should have created new event", function(err, res, body){
                    if(err) console.log(err);
                    else{
                        body = JSON.parse(body);
                        assert.equal(body.Event.Subject, "test");
                    }
                })
            .setHeader('Content-Type', 'text/html')
            .get('/users', {})
               .expect(200)
        .undiscuss().unpath()
.export(module);
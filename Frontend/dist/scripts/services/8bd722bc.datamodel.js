FrontendApp.factory('datamodel', function($resource){
    var datamodel = {};
    var serverUrl = "http://localhost\\:3001";

    datamodel.User = $resource(serverUrl + '/users/:userid:action',{
            userid: "@userid",
            action: "@action"
        },{
            login : {method : "POST", params : {action : "login"}}
        }
    );

    datamodel.Category = $resource(serverUrl + '/users/:userid/events/categories',
        {
            userid: "@userid"
        }
    );

    datamodel.Event = $resource(serverUrl + '/users/:userid/events/:time1:eventid/:time2',
        {
            userid: "@userid",
            time1: "@time1",
            time2: "@time2",
            eventid: "@eventid"
        }
    );

    return datamodel;
});
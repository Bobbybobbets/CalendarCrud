FrontendApp.factory('datamodel', function($resource){
    var datamodel = {};
    var serverUrl = "http://localhost\\:3001";

    datamodel.Event = $resource(serverUrl + '/users/:userid/events/:time1:eventid/:time2',
        {
            userid: 1,
            time1: "@time1",
            time2: "@time2",
            eventid: "@eventid"
        }
    );

    return datamodel;
});
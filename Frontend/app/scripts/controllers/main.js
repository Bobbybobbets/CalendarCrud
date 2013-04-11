'use strict';

FrontendApp.controller('MainCtrl', function($rootScope, $scope, $location, datamodel) {
    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();

    $scope.events = [];
    $scope.eventCategories = [];
    $scope.filteredEvents = [];
    $scope.eventSources = [];
    $scope.equalsTracker = 0;
    $scope.inputImportant = false;
    $scope.userid = $rootScope.User.id;
    $scope.eventInfo = {};
    $scope.newCategory = {
        Color : "#ffffff"
    };
    $('.datepicker').datepicker();
    $('.timepicker').timepicker({
        showMeridian : false
    });
    /*$('#cp1').colorpicker({
        format: 'hex'
    }).on('changeColor', function(ev){
        $scope.newCategory.Color = ev.color.toHex();
    });*/

    $("#calendar").fullCalendar({
        height: 450,
        editable: true,
        header:{
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay'
        },
        eventSources: $scope.eventSources,
        eventClick: function(event, jsEvent, view){
            var e = datamodel.Event.get({
                userid: $scope.userid,
                eventid: event.id
            }, function(){
                var startDate = new Date(e.StartDate);
                var endDate = new Date(e.EndDate);
                var categoryID;

                if(e.CategoryFK.id != undefined)
                {
                    categoryID = e.CategoryFK.id;
                }
                else
                {
                    categoryID = e.CategoryFK;
                }

                $scope.eventInfo.ID = e.id;
                $scope.eventInfo.Subject = e.Subject;
                $scope.eventInfo.Category = categoryID; 
                $scope.eventInfo.Location = e.Location;
                $scope.eventInfo.StartDate = startDate.toString("yyyy-MM-dd");
                $scope.eventInfo.StartTime = startDate.toString("HH:mm");
                $scope.eventInfo.EndDate = endDate.toString("yyyy-MM-dd");
                $scope.eventInfo.EndTime = endDate.toString("HH:mm");
                $scope.eventInfo.Description = e.Description;
                $scope.eventInfo.Important = e.Important;
                $("#modifyEventModal").modal('toggle');
                $("#modifyEventModal").modal('show');
            });
        }
    });
    
    $scope.fetchEvents = function(start, end){
        var userid = $scope.userid;

        $scope.fetchCategories();
        datamodel.Event.query({userid: userid, time1: start, time2: end}, function(data){
            $scope.events = (_.map(data, function(event){
                
                var categoryID;

                if(event.CategoryFK.id != undefined)
                {
                    categoryID = event.CategoryFK.id;
                }
                else
                {
                    categoryID = event.CategoryFK;
                }

                return {
                    id: event.id,
                    title: event.Subject,
                    category: categoryID,
                    color: event.CategoryFK.Color,
                    start: new Date(event.StartDate),
                    end: new Date(event.EndDate)
                };
            }));

            $scope.renderCalendar();
        });
    };

    $scope.fetchCategories = function(){
        var userid = $scope.userid;

        datamodel.Category.query({userid: userid}, function(data){
            $scope.eventCategories = (_.map(data, function(category){
                category.Checked = true;
                return category;
            }));
        });
    };

    $scope.renderCalendar = function(){
        $scope.filteredEvents = [];

        for(var i = 0; i < $scope.eventCategories.length; i++){
            var category = $scope.eventCategories[i];
            if(category.Checked){
                for(var j = 0; j < $scope.events.length; j++){
                    var event = $scope.events[j];
                    if(event.category == category.id){
                        $scope.filteredEvents.push(event);
                    }
                }
            }
        }

        $("#calendar").fullCalendar("removeEvents");
        $("#calendar").fullCalendar("addEventSource", $scope.filteredEvents);
    };

    $scope.remove = function(index) {
        $scope.events.splice(index,1);
    };
    $scope.clearEventInfo = function(){
        $scope.eventInfo = {};
    };
    $scope.addNewEvent = function(){

        var newEvent = new datamodel.Event({
            category : $scope.eventInfo.Category,   
            type : 1,
            subject : $scope.eventInfo.Subject,
            location : $scope.eventInfo.Location,
            start_date : $scope.eventInfo.StartDate + "T" + $scope.eventInfo.StartTime + "-0400",
            end_date : $scope.eventInfo.EndDate + "T" + $scope.eventInfo.EndTime + "-0400",
            description : $scope.eventInfo.Description,
            important : $scope.eventInfo.Important
        });

        newEvent.$save({
            userid: $scope.userid
        }, function(data){
            var e = {
                id: data.id,
                title: data.Subject,
                start: data.StartDate,
                end: data.EndDate
            };  

            $scope.fetchEvents();
            //$("#calendar").fullCalendar('renderEvent', e);
        });
    };
    $scope.addNewCategory = function(){
        var newCategory = new datamodel.Category({
            CategoryName : $scope.newCategory.Name,
            Color : $scope.newCategory.Color
        });

        newCategory.$save({
            userid : $scope.userid
        }, function(data){
            console.log(data);
            $scope.fetchEvents();
        });
    };
    $scope.modifyEvent = function(){
        var event = new datamodel.Event({
            id : $scope.eventInfo.ID,
            category : $scope.eventInfo.Category,
            type : 1,
            subject : $scope.eventInfo.Subject,
            location : $scope.eventInfo.Location,
            start_date : $scope.eventInfo.StartDate + "T" + $scope.eventInfo.StartTime + "-0400",
            end_date : $scope.eventInfo.EndDate + "T" + $scope.eventInfo.EndTime + "-0400",
            description : $scope.eventInfo.Description,
            important : $scope.eventInfo.Important
        });

        event.$save({
            userid: $scope.userid,
            eventid : $scope.eventInfo.ID
        }, function(data){
            $scope.fetchEvents();
        });
    };
    $scope.deleteEvent = function(){
        console.log($scope.eventInfo.ID);
        datamodel.Event.delete({
            userid: $scope.userid,
            eventid: $scope.eventInfo.ID
        }, function(data){
            $scope.fetchEvents();
        });
    };
    $scope.logout = function(){
        $rootScope.User = null;
        $location.path('/login');
    };


    $scope.uiConfig = {
        fullCalendar:{
            height: 450,
            editable: true,
            header:{
                left: 'prev,next today',
                center: 'title',
                right: 'month,agendaWeek,agendaDay'
            }
        }
    };

    $scope.fetchEvents();
    $scope.fetchCategories();
});
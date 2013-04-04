'use strict';

FrontendApp.controller('MainCtrl', function($scope, datamodel) {
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
    $scope.userid = 1;
    $('.datepicker').datepicker();
    $('.timepicker').timepicker({
        showMeridian : false,
    });

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

                $scope.inputID = e.id;
                $scope.inputSubject = e.Subject;
                $scope.inputCategory = e.CategoryFK.id; 
                $scope.inputLocation = e.Location;
                $scope.inputStartDate = startDate.toString("yyyy-MM-dd");
                $scope.inputStartTime = startDate.toString("HH:mm");
                $scope.inputEndDate = endDate.toString("yyyy-MM-dd");
                $scope.inputEndTime = endDate.toString("HH:mm");
                $scope.inputDescription = e.Description;
                $scope.inputImportant = e.Important;
                $("#modifyEventModal").modal('toggle');
                $("#modifyEventModal").modal('show');
            });
        }
    });
    
    $scope.fetchEvents = function(start, end){
        var userid = 1;

        $scope.fetchCategories();
        datamodel.Event.query({userid: userid, time1: start, time2: end}, function(data){
            $scope.events = (_.map(data, function(event){
                
                return {
                    id: event.id,
                    title: event.Subject,
                    category: event.CategoryFK.id,
                    color: event.CategoryFK.Color,
                    start: new Date(event.StartDate),
                    end: new Date(event.EndDate)
                };
            }));

            $scope.renderCalendar();
        });
    };

    $scope.fetchCategories = function(){
        var userid = 1;

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

    $scope.addNewEvent = function(){
        var newEvent = new datamodel.Event({
            category : $scope.inputCategory,
            type : 1,
            subject : $scope.inputSubject,
            location : $scope.inputLocation,
            start_date : $scope.inputStartDate + "T" + $scope.inputStartTime + "-0400",
            end_date : $scope.inputEndDate + "T" + $scope.inputEndTime + "-0400",
            description : $scope.inputDescription,
            important : $scope.inputImportant
        });

        newEvent.$save({userid: $scope.userid}, function(data){
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
    $scope.modifyEvent = function(){
        var event = new datamodel.Event({
            id : $scope.inputID,
            category : 1,
            type : 1,
            subject : $scope.inputSubject,
            location : $scope.inputLocation,
            start_date : $scope.inputStartDate + "T" + $scope.inputStartTime + "-0400",
            end_date : $scope.inputEndDate + "T" + $scope.inputEndTime + "-0400",
            description : $scope.inputDescription,
            important : $scope.inputImportant
        });

        event.$save({
            userid: $scope.userid,
            eventid : $scope.inputID
        }, function(data){
            $scope.fetchEvents();
        });
    };
    $scope.deleteEvent = function(){
        console.log($scope.inputID);
        datamodel.Event.delete({
            eventid: $scope.inputID
        });

        $scope.fetchEvents();
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
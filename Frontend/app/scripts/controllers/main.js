'use strict';

FrontendApp.controller('MainCtrl', function($scope, datamodel) {
    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();

    $scope.events = [];
    $scope.eventSources = [];
    $scope.equalsTracker = 0;
    $scope.inputImportant = false;
    $('.datepicker').datepicker();
    $('.timepicker').timepicker({
        showMeridian : false,
    });

    
    datamodel.Event.get({time1: "", time2: ""}, function(data){
        $scope.events = (_.map(data.events, function(event){
            
            return {
                id: event.id,
                title: event.Subject,
                start: new Date(event.StartDate),
                end: new Date(event.EndDate)
            };
        }));


        $("#calendar").fullCalendar({
            height: 450,
            editable: true,
            header:{
                left: 'prev,next today',
                center: 'title',
                right: 'month,agendaWeek,agendaDay'
            },
            events: $scope.events,
            eventClick: function(event, jsEvent, view){
                var e = datamodel.Event.get({
                    eventid: event.id
                }, function(){
                    e = e.event;
                    var startDate = new Date(e.StartDate);
                    var endDate = new Date(e.EndDate);

                    $scope.inputID = e.id;
                    $scope.inputSubject = e.Subject;
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
    });

    $scope.remove = function(index) {
        $scope.events.splice(index,1);
    };

    $scope.addNewEvent = function(){
        var newEvent = new datamodel.Event({
            category : 1,
            type : 1,
            subject : $scope.inputSubject,
            location : $scope.inputLocation,
            start_date : $scope.inputStartDate + "T" + $scope.inputStartTime + "-0400",
            end_date : $scope.inputEndDate + "T" + $scope.inputEndTime + "-0400",
            description : $scope.inputDescription,
            important : $scope.inputImportant
        });

        newEvent.$save(function(data){
            var e = {
                id: data.id,
                title: data.Subject,
                start: data.StartDate,
                end: data.EndDate
            };

            $scope.events.push(e);
            $("#calendar").fullCalendar('renderEvent', e);
            console.log(data);
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
            eventid : $scope.inputID
        });
    };
    $scope.deleteEvent = function(){
        console.log($scope.inputID);
        datamodel.Event.delete({
            eventid: $scope.inputID
        });
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
});
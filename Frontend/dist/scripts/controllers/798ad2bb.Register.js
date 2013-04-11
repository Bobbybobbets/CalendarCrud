'use strict'

FrontendApp.controller('RegisterCtrl', function($scope, datamodel, $location){
    $scope.register = function(){
        var user = new datamodel.User({
            Username : $scope.inputUsername,
            Password : $scope.inputPassword,
            FirstName : $scope.inputFirstName,
            LastName : $scope.inputLastName
        });

        user.$save({}, function(data){
            $location.path("/login");
        });
    };
});
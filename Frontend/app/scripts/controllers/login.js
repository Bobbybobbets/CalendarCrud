'use strict';

FrontendApp.controller('LoginCtrl', function($scope, datamodel, $cookies, $location){
    $scope.login = function(){
        datamodel.User.login({
            Username : $scope.inputUsername,
            Password : $scope.inputPassword
        }, function(data){
            $cookies.User = {
                id : data.id,
                Username : data.Username
            };

            $location.path("/");
        });
    };
});
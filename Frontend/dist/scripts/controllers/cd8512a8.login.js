'use strict';

FrontendApp.controller('LoginCtrl', function($rootScope, $scope, datamodel, $cookies, $location){
    $scope.login = function(){
        datamodel.User.login({
            Username : $scope.inputUsername,
            Password : $scope.inputPassword
        }, function(data){
            console.log(data);
            $rootScope.User = data;
            $location.path("/");
        });
    };
});
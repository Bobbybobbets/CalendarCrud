'use strict';

var FrontendApp = angular.module('FrontendApp', ['ui', 'ngResource', '$strap.directives', 'ngCookies'])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .when('/register', {
        templateUrl: 'views/register.html',
        controller: 'RegisterCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }])
  /*.config(['$httpProvider', function($httpProvider){
    var loginCheckInterceptor = ['$rootScope', '$q', '$location', function(scope, $q, $location){

      function success(response){
        return response;
      }
      
      function error(response){
        var status = response.status;
        if(status == 401){
          var deferred = $q.defer();

          //scope.$broadcast('event:loginRequired');
          scope.logged = false;
          $location.path('/login');
          return deferred.promise;
        }
        
        return $q.reject(response);
      }
      return function(promise){
        return promise.then(success, error);
      }
    }];

    $httpProvider.responseInterceptors.push(loginCheckInterceptor);
  }])*/;

var app = angular.module('SersApp');

app.config(['$routeProvider', function($routeProvider)
  {
   $routeProvider
    .when('/', {
     templateUrl: './top.html',
     controller: 'SersController'
     })
    .when('/home', {
     templateUrl: './home.html',
     controller: 'HomeController'
     })
    .when('/login', {
      templateUrl: 'login.html',
      controller: 'LoginController'
    })
    .when('/residents', {
      templateUrl: '/residents/residents.html',
      controller: 'ResidentController'
    })
   .when('/dataManager', {
       templateUrl: '/datamanager/dataManager.html',
       controller: 'DataController'
   })
  }
]);


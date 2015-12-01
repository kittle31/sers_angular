var app = angular.module('SersApp');

app.controller('HomeController', [ '$scope', '$http', '$location', 'UserService', function($scope, $http, $location, UserService)
  {
   $scope.screenName = 'Home screen for'

   $scope.getGreeting = function()
     {
      return "Good morning user";
     };
  }]);

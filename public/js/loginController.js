angular.module('SersApp').controller('LoginController', [ '$scope', '$http', '$location', 'UserService', function($scope, $http, $location, UserService)
  {
   $scope.screenName = 'SAFE Family Ministries login';
   $scope.doLogin = function()
     {
      // login and get a user object back
      var pr = $http.post('/api/login', {params: {user: $scope.userid, pass: $scope.password} })
        .success(function(data, res,headers )
         {
          // if Authorization failed, then there was also an error
          $scope.data.user.error = !$scope.data.user.auth;
          console.log('got auth token '+headers('x-sers-auth-token'));

          UserService.userData.user.authToken=headers('x-sers-auth-token');
          $location.path('/home');
         })
         .error(function(data, status, headers, config)
         {
          console.log(data);
          console.log(status);
          console.log(headers);
          console.log(config);
          $scope.$parent.data.user.message = 'Error accessing server';
          $scope.$parent.data.user.error = true;
         });

     };

  }
]);


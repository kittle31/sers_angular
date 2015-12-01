/**
 * Created by Jon on 11/8/2015.
 */
var app = angular.module('SersApp');

app.controller('DataController', [ '$scope', '$http', '$location', 'UserService', function($scope, $http, $location, UserService) {
    $scope.screenName = 'Data Manager';
    $scope.staff = [];
    $scope.selectedStaff = {};
    $scope.roles=[];

    // mode will be 'main', or screen name
    $scope.mode = "main";
    $scope.main= function()
      {
       $scope.screenName="Data Manager";
       $scope.mode="main";
      };

    $scope.personel = function()
      {
       $http.get('/api/getStaffList').success(function(data,res)
           {
            $scope.mode = 'staffMain';
            $scope.screenName='Personell Editor';
            $scope.staff = data.data;
           });
      };

    $scope.newStaff = function()
      {
      $http.get('/api/newStaff').success(function(data, res)
        {
         $scope.selectedStaff = data.data;
         $scope.mode = 'newStaff';
         $scope.screenName = 'New Personell Record';
        });
      };

    $scope.saveStaff = function()
      {
       $http.post('/api/saveStaff', $scope.selectedStaff).success(function(data, res)
         {
          console.log("save staff");
          $scope.personel();
         });
      };

    $scope.editStaff = function(aStaff)
      {
       $scope.selectedStaff=aStaff;
       $scope.mode = 'newStaff';
       $scope.screenName = 'Edit Personell Record';
      };

    $scope.securityRoles = function()
      {
       $http.get('/api/getRoleList').success(function(data, res)
         {
          $scope.roles = data.data;
          $scope.mode='roleMain';
          $scope.screenName = 'Security Roles';
         }
       );
      };

    $scope.getRoles = function(aStaff)
      {
       return aStaff.roles.join(' ');
      };
    $scope.editRole = function(aRole)
      {

      };
}]);

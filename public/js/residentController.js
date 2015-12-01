var app = angular.module('SersApp');

app.controller('ResidentController', [ '$scope', '$http', '$location', 'UserService', function($scope, $http, $location, UserService)
  {
   $scope.screenName = 'Residents';
   $scope.selectedResident ={};
   // mode will be 'main', 'new' or 'edit'
   $scope.mode="main";


   $scope.formatPhone = function(phone)
     {
      if (phone == null)
         return "";
      return "("+phone.ac+") "+phone.prefix+"-"+phone.suffix;
     };

   $scope.letterSearch = function(letter)
     {
      console.log("search for "+letter);
     };

   $scope.newResident = function()
     {
      $http.get('/api/newResident').success(function(data, res)
        {
         $scope.selectedResident = data.data;
         $scope.screenName = 'New Resident';
         $scope.mode='new';
        }
      );
     };

   $scope.saveResident = function()
     {
      $http.post('/api/saveResident', $scope.resident).success(function(data, res, headers )
        {
         console.log("resident saved");
         $scope.selectedResident = data.data;
         $location.path('/residents');
        });
     };
  $scope.editResident = function()
    {
     //edit the selected resident
     $scope.screenName = 'Edit Resident';
     $scope.mode = 'edit';
    };
  $scope.selectResident = function(res)
    {
     $scope.selectedResident = res;
    };
  $scope.cancelResident = function()
    {
     $scope.screenName = 'Residents';
     $scope.mode="main";
    };

  function getResidents()
     {
      // Fetch the residents to display
      $http.get('/api/getResidentList').success(function(data, res)
        {
         $scope.residents = data.data;
        }
      );
      return "";
     }
  getResidents();
  }]);


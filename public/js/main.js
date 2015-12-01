var app = angular.module('SersApp', ['ngRoute']);

app.factory('UserService', function($injector)
{
    var url = 'http://localHost:7777/BuilderDBSvc';

    var userService = {
        userData : {
            // initially user is not authenticated
            user: {
                auth: false,
                error: false,
                admin : false,
                authToken: "",
                name: "undefined user",
                message: "Please login"
            },
            players: [],
        }
    };

    userService.getUserData = function()
    {
        return userService.userData;
    };

    userService.updatePlayers = function()
    {
        // get the player list from the server

        var http = $injector.get('$http');
        return http.get(url + '/players')
            .success(function(httpData)
            {
                userService.userData.players = httpData;
            })
            .error(function(httpData, status, headers, config)
            {
                console.log(httpData);
                console.log(status);
                console.log(headers);
                console.log(config);
            });
    };

    userService.getPlayers = function()
    {
        // get players from server, or from local cache
        // always returns a promise

        if ( userService.userData.players.length==0 )
        {
            return userService.updatePlayers();
        }
        var q = $injector.get('$q');

        return q( function(resolve, reject)
            {
                // mimic return structure from the http call
                var ret = {
                    data : userService.userData.players
                }
                resolve(ret);
            }
        );
    }

    userService.deletePlayer = function(playerID)
    {
        // delete the player with the given playerID

        var http = $injector.get('$http');
        return http.get(url+'/deletePlayer/'+playerID ).success(function(data)
        {
            userService.userData.players = data;
        })
            .error(function(data, status, headers, config)
            {
                console.log(data);
                console.log(status);
                console.log(headers);
                console.log(config);
            });

    }
    userService.newPlayer = function()
    {
        // add a new player.  update the players list with the results

        var http = $injector.get('$http');
        return http.get(url+'/newPlayer').success(function(data)
        {
            userService.userData.players = data;
        })
            .error(function(data, status, headers, config)
            {
                console.log(data);
                console.log(status);
                console.log(headers);
                console.log(config);
            });
    }

    return userService;
});

app.controller('SersController', function($scope, UserService)
{
    $scope.data = UserService.userData;
    $scope.messageToDisplay="";
    $scope.showMessage = function(aString)
    {
        $scope.messageToDisplay=aString;
    };
    $scope.clearMessage = function()
    {
        $scope.messageToDisplay="";
    }
});

app.factory('myInterceptor', ['UserService', '$q', '$location', function(UserService, $q, $location)
{
    var myInterceptor =
    {
        request : function(req)
        {
            //console.log("Add builder auth token "+UserService.data.user.authToken);
            req.headers['x-builder-auth-token'] = UserService.userData.user.authToken;
            return req;
        },
        responseError: function(response)
        {
            console.log("handle error");
            $location.path('/login');
            return $q.reject(response);
        }
    };

    return myInterceptor;
}]);

app.config(['$httpProvider', function($httpProvider)
{
    $httpProvider.interceptors.push('myInterceptor');
}
]);

'use strict';

hangmanModule.controller('LoginCtrl', function ($scope, $http, $location, hangmanService) {
    $scope.loginCredentials = {};

    $scope.login = function(){
        $http.post("/login", $scope.loginCredentials)
            .success(function(data){
                $location.path("/game");
            })
            .error(function(data, status){
                switch (status){
                    case 400:
                        $scope.specialError = "400 error returned";
                        break;
                    case 402:
                        $scope.specialError = "402 error returned";
                        break;
                    default:
                        $scope.specialError = "Who cares";
                }
                $scope.errMsg = data;
            });
    }
});
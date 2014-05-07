'use strict';

var hangmanModule = angular.module('hangmanApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute'
])
    .config(function ($routeProvider, $httpProvider, $locationProvider) {
        $routeProvider
            .when('/login', {templateUrl: 'views/login.html',controller: 'LoginCtrl'})
            .when('/game',{templateUrl: 'views/game.html', controller: 'GameCtrl'})
            .when('/error',{templateUrl: 'views/error.html', controller: 'ErrorCtrl'})
            .otherwise({redirectTo: '/login'});
    });



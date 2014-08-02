'use strict';

/**
 * @ngdoc overview
 * @name skillsJsApp
 * @description
 * # skillsJsApp
 *
 * Main module of the application.
 */
angular
    .module('skillsJsApp', [
        'ngResource',
        'ngRoute',
        'ui.bootstrap',
        'ngGrid'
    ])
    .constant('REST_URL', '')
    .config(function ($provide, $routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainController'
            })
            .when('/about', {
                templateUrl: 'views/about.html',
                controller: 'AboutController'
            })
            .when('/teams', {
                templateUrl: 'views/teams.html',
                controller: 'TeamsController'
            })
            .when('/skills', {
                templateUrl: '../views/skills.html',
                controller: 'SkillsController'
            })
            .otherwise({
                redirectTo: '/'
            });
        /*
        $provide.decorator("$exceptionHandler", function ($delegate) {
            return function (exception, cause) {
                $delegate(exception, cause);
                // TODO exception handling
            };
        });
        */
        // $locationProvider.html5Mode(true);
    });

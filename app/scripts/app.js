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
    .config(function ($provide, $routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/skills.html',
                controller: 'SkillsController'
            })
            .when('/about', {
                templateUrl: 'views/about.html',
                controller: 'AboutController'
            })
            .otherwise({
                redirectTo: '/'
            });
        $provide.decorator("$exceptionHandler", function ($delegate) {
            return function (exception, cause) {
                $delegate(exception, cause);
                // TODO exception handling
                // alert(exception.message);
            };
        });
        $locationProvider.html5Mode(true);
    });

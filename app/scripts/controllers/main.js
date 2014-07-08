'use strict';

/**
 * @ngdoc function
 * @name skillsJsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the skillsJsApp
 */
angular.module('skillsJsApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });

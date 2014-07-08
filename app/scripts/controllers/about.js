'use strict';

/**
 * @ngdoc function
 * @name skillsJsApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the skillsJsApp
 */
angular.module('skillsJsApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });

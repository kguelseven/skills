'use strict';

angular.module('skillsJsApp')
	.factory('Focus', function ($rootScope, $timeout) {
		return function (name) {
			$timeout(function () {
				$rootScope.$broadcast('focusOn', name);
			});
		};
	});
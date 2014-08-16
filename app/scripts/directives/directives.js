'use strict';

angular.module('skillsJsApp')
	.directive('focusOn', function () {
		return function (scope, element, attrib) {
			scope.$on('focusOn', function (e, name) {
				if (attrib.focusOn === name) {
					element[0].focus();
				}
			});
		};
	});

'use strict';

angular.module('skillsJsApp')
	.factory('skillService', ['$http', 'REST_URL', function ($http, url) {

		var service = {

			loadCategories: function () {
				return $http.get(url + '/categories', {cache: true})
					.then(function (result) {
						return result.data;
					});
			},

			loadSkills: function (personId) {
				return $http.get(url + '/skills/' + personId)
					.then(function (result) {
						return result.data;
					});

			},

			saveSkill: function (skill) {
				return $http.post(url + '/skills', skill)
					.then(function (result) {
						return result.data;
					});
			}
		};

		return service;
	}]);
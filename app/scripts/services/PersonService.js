'use strict';

angular.module('skillsJsApp')
	.factory('PersonService', ['$http', '$cacheFactory', 'REST_URL', function ($http, cacheFactory, url) {

		var httpCache = cacheFactory.get('$http');

		return  {

			loadTeams: function () {
				return $http.get(url + '/team', {cache: true})
					.then(function (result) {
						return result.data;
					});
			},

			saveTeam: function (team) {
				return $http.post(url + '/team', team)
					.then(function (result) {
						team.id = result.data.id;
						httpCache.remove('url + '/team);
						return team;
					});
			},

			deleteTeam: function (id) {
				return $http.delete(url + '/team/' + id)
					.then(function (result) {
						console.log('deleted:' + id + 'result:' + JSON.stringify(result));
						httpCache.remove(url + '/team/' + id);
					});
			},

			loadPersonsByTeam: function (id) {
				return $http.get(url + '/person/' + id, {cache: true})
					.then(function (result) {
						return result.data;
					});
			}
		};
	}]);

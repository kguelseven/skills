'use strict';

angular.module('skillsJsApp')
	.factory('PersonService', ['$http', '$cacheFactory', 'REST_URL', function ($http, cacheFactory, urlBase) {

		// var httpCache = cacheFactory.get('$http');

		return  {

			loadTeams: function (parentId) {
				var url = parentId ? (urlBase + '/team/' + parentId) : (urlBase + '/team');
				return $http.get(url)
					.then(function (result) {
						return result.data;
					});
			},

			loadAllTeams: function () {
				var url = urlBase + '/team/all';
				return $http.get(url)
					.then(function (result) {
						var teams = result.data;
						var teamMap = {};
						teams.forEach(function (team) {teamMap[team.id] = team; });
						teams.forEach(function(team) {
							if(team.parentId) {
								team.parent = teamMap[team.parentId];
							}
						});
						console.log(JSON.stringify(teams));
						return teams;
					});
			},

			addTeam: function (team) {
				var url = urlBase + '/team';
				return $http.post(url, team)
					.then(function (result) {
						var team = result.data;
						// httpCache.remove(url + '/team');
						// if (team.parentId) {httpCache.remove(url + '/team/' + team.parentId);}
						return team;
					});
			},

			updateTeam: function (team) {
				var url = urlBase + '/team/' + team.id;
				return $http.put(url, team)
					.then(function (result) {
						var team = result.data;
						// httpCache.remove(url + '/team');
						// if (team.parentId) {httpCache.remove(url + '/team/' + team.parentId);}
						return team;
					});
			},

			deleteTeam: function (id) {
				return $http.delete(urlBase + '/team/' + id)
					.then(function (result) {
						// httpCache.remove(url + '/team/' + id);
					});
			},

			loadPersonsByTeam: function (id) {
				return $http.get(urlBase + '/person/' + id)
					.then(function (result) {
						return result.data;
					});
			},

			addMember: function (member) {
				var url = urlBase + '/person';
				return $http.post(url, member)
					.then(function (result) {
						var member = result.data;
						// httpCache.remove(url + '/team');
						// if (member.parentId) {httpCache.remove(url + '/team/' + team.parentId);}
						return member;
					});
			},

			updateMember: function (member) {
				var url = urlBase + '/person/' + member.id;
				return $http.put(url, member)
					.then(function (result) {
						var member = result.data;
						// httpCache.remove(url + '/team');
						// if (team.parentId) {httpCache.remove(url + '/team/' + team.parentId);}
						return member;
					});
			},

			deleteMember: function (id) {
				return $http.delete(urlBase + '/person/' + id)
					.then(function (result) {
						return result;
						// httpCache.remove(url + '/team/' + id);
					});
			}
		};
	}]);

'use strict';

angular.module('skillsJsApp')
	.factory('personService', function (/*$resource*/) {
		var service = {

			loadTeams: function () {
				return [
					{ id: 1, name: 'CD1-T13'},
					{ id: 2, name: 'CD1-T12'},
					{ id: 3, name: 'CD1-T11'}
				];
			},

			loadPersonByTeam: function (id) {
				var results;
				if (id === 1) {
					results = [
						{ id: 1, team: 1, vorname: 'Korhan', name: 'Gülseven'},
						{ id: 2, team: 1, vorname: 'Renato', name: 'Löffel'},
						{ id: 3, team: 1, vorname: 'Patrick', name: 'Williner'}
					];
				}
				else {
					results = [
						{ id: 1, team: 1, vorname: 'Hanso', name: 'Habanso'},
						{ id: 2, team: 1, vorname: 'Jack', name: 'Cracker'},
						{ id: 3, team: 1, vorname: 'Matter', name: 'Master'}
					];
				}
				return results;
			}
		};
		return service;
	});

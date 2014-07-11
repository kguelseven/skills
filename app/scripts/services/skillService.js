'use strict';

angular.module('skillsJsApp')
	.factory('skillService', function (/*$resource*/) {
		var service = {
			loadSkills: function () {
				return [
					{ id: 1, skill: 'Maven', expertise: 'senior'},
					{ id: 2, skill: 'AngularJS', expertise: 'junior'},
					{ id: 3, skill: 'JPA', expertise: 'junior'}
				];
			},
			loadSkillsByMitarbeiter: function (id) {
				var skills = [];
				var i;
				if (id === 1) {
					for (i = 0; i < 20; i++) {
						skills.push({ id: i, skill: 'Master Skill - ' + i, expertise: 'Senior'});
					}
				} else {
					for (i = 0; i < 20; i++) {
						skills.push({ id: i, skill: 'FooBooZong Skill - ' + id + '-' + i, expertise: 'Juniore'});
					}
				}
				return skills;
			}
		};
		return service;
	});
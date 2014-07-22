'use strict';

angular.module('skillsJsApp')
	.factory('skillService', function (/*$resource*/) {

        var kategorien = [
            {id: 1, name: 'Java'},
            {id: 2, name: 'Datenbanken'},
            {id: 3, name: 'Tools'},
            {id: 4, name: 'Methoden'},
            {id: 5, name: 'JavaScript'}
        ];

        var lookupKategorie = function(id) {
            var i;
            for(i = 0; i < kategorien.length; i++) {
                if(id === kategorien[i].id) {
                    return kategorien[i].name;
                }
            }
            return null;
        };

        var service = {
            loadKategorien: function() {
                return kategorien;
            },
			loadSkillsForMitarbeiterAndKategorie: function (mitarbeiterId, kategorieId) {
				var skills = [];
				var i;
				if (mitarbeiterId === 1) {
					for (i = 0; i < 20; i++) {
						skills.push({ id: i, skill: 'Master Skill - ' + mitarbeiterId + '-' + i + '-' + lookupKategorie(kategorieId), interesse: 3, expertise: 3});
					}
				} else {
					for (i = 0; i < 20; i++) {
						skills.push({ id: i, skill: 'FooBooZong Skill - ' + mitarbeiterId + '-' + i + '-' + lookupKategorie(kategorieId), interesse:3, expertise: 1});
					}
				}
				return skills;
			}
		};
		return service;
	});
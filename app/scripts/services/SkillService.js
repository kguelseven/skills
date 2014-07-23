'use strict';

angular.module('skillsJsApp')
    .factory('skillService', function (/*$resource*/) {

        var categories = [
            {id: 1, name: 'Java'},
            {id: 2, name: 'Datenbanken'},
            {id: 3, name: 'Tools'},
            {id: 4, name: 'Methoden'},
            {id: 5, name: 'JavaScript'}
        ];

        var skills = [
            {id: 1, category: 1, name: 'JPA'},
            {id: 2, category: 1, name: 'Web Services'},
            {id: 3, category: 1, name: 'JAXB'},
            {id: 4, category: 1, name: 'Security'},
            {id: 5, category: 2, name: 'Oracle'},
            {id: 6, category: 2, name: 'MS SQL'},
            {id: 7, category: 2, name: 'Performance Tuning'},
            {id: 8, category: 2, name: 'DBA'},
            {id: 9, category: 3, name: 'Eclipse'},
            {id: 10, category: 3, name: 'IntelliJ'},
            {id: 11, category: 3, name: 'EA'}
        ];


        var service = {
            loadCategories: function () {
                return categories;
            },
            loadSkills: function() {
                return skills;
            },
            loadSkillsForPerson: function (personId) {
                var skills = [];
                var i;
                if (personId === 1) {
                    for (i = 0; i < 20; i++) {
                        skills.push({ id: i, skill: 'Master Skill - ' + personId + '-' + i,  categoryId: 1, category: 'Java', interesse: 3, expertise: 3});
                    }
                } else {
                    for (i = 0; i < 20; i++) {
                        skills.push({ id: i, skill: 'FooBooZong Skill - ' + personId + '-' + i, categoryId: 2 , category: 'Datenbanken', interesse: 3, expertise: 0});
                    }
                }
                return skills;
            }
        };
        return service;
    });
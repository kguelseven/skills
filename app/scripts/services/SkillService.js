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
            {id: 1, categoryId: 1, category: 'Java', name: 'JPA'},
            {id: 2, categoryId: 1, category: 'Java', name: 'Web Services'},
            {id: 3, categoryId: 1, category: 'Java', name: 'JAXB'},
            {id: 4, categoryId: 1, category: 'Java', name: 'Security'},
            {id: 5, categoryId: 2, category: 'Datenbanken', name: 'Oracle'},
            {id: 6, categoryId: 2, category: 'Datenbanken', name: 'MS SQL'},
            {id: 7, categoryId: 2, category: 'Datenbanken', name: 'Performance Tuning'},
            {id: 8, categoryId: 2, category: 'Datenbanken', name: 'DBA'},
            {id: 9, categoryId: 3, category: 'Tools', name: 'Eclipse'},
            {id: 10, categoryId: 3, category: 'Tools', name: 'IntelliJ'},
            {id: 11, categoryId: 3, category: 'Tools', name: 'EA'}
        ];

        var loadSkillsForPerson = function (personId) {
            var skills = [];
            var i;
            for (i = 1; i < 9; i++) {
                skills.push({ id: i, skill: i, interest: personId, expertise: personId % i});
            }
            return skills;
        };


        var service = {


            loadCategories: function () {
                return categories;
            },

            loadSkills: function (personId) {
                var skillsPerson = {};
                angular.forEach(skills, function (skill) {
                    skillsPerson[skill.id] = {skillId: skill.id, skill: skill.name, categoryId: skill.categoryId, category: skill.category, interest: 0, expertise: 0};
                });

                var skillsDefined = loadSkillsForPerson(personId);
                angular.forEach(skillsDefined, function (skill) {
                    if (!skillsPerson.hasOwnProperty(skill.skill)) {
                        throw new Error('Unknown skills with id = ' + skill.skill);
                    }
                    skillsPerson[skill.skill].id = skill.id;
                    skillsPerson[skill.skill].interest = skill.interest;
                    skillsPerson[skill.skill].expertise = skill.expertise;
                });

                var skillsArr = [];
                for (var key in skillsPerson) {
                    if (skillsPerson.hasOwnProperty(key)) {
                        skillsArr.push(skillsPerson[key]);
                    }
                }

                return skillsArr;
            },

            save: function (skill) {
                console.log('saving:' + skill.id);
            }

        };
        return service;
    });
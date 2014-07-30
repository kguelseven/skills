'use strict';

angular.module('skillsJsApp')
    .factory('skillService', function ($http) {

        var service = {

            loadCategories: function () {
                return $http.get('/categories', {cache: true})
                    .then(function (result) {
                        return result.data;
                    });
            },

            loadSkills: function (personId) {
                return $http.get('/skills/' + personId)
                    .then(function (result) {
                        return result.data;
                    });

            },

            saveSkill: function (skill) {
                return $http.post('/skills', skill)
                    .then(function (result) {
                        return result.data;
                    });
            }
        };

        return service;
    });
'use strict';

angular.module('skillsJsApp')
    .factory('personService', function ($http) {

        var service = {

            loadTeams: function () {
                return $http.get('/teams', {cache: true})
                    .then(function (result) {
                        return result.data;
                    });
            },

            loadPersonByTeam: function (id) {
                return $http.get('/teams/' + id, {cache: true})
                    .then(function (result) {
                        return result.data;
                    });
            }
        };

        return service;
    });

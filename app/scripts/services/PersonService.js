'use strict';

angular.module('skillsJsApp')
    .factory('personService', ['$http', 'REST_URL', function ($http, url) {

        var service = {

            loadTeams: function () {
                return $http.get(url + '/teams', {cache: true})
                    .then(function (result) {
                        return result.data;
                    });
            },

            loadPersonByTeam: function (id) {
                return $http.get(url + '/teams/' + id, {cache: true})
                    .then(function (result) {
                        return result.data;
                    });
            }
        };

        return service;
    }]);

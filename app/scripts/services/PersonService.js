'use strict';

angular.module('skillsJsApp')
    .factory('personService', ['$http', 'REST_URL', function ($http, url) {

        return  {

            loadTeams: function () {
                return $http.get(url + '/teams', {cache: true})
                    .then(function (result) {
                        return result.data;
                    });
            },

            loadPersonsByTeam: function (id) {
                return $http.get(url + '/teams/' + id, {cache: true})
                    .then(function (result) {
                        return result.data;
                    });
            }
        };

    }]);

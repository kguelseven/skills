'use strict';

/**
 * @ngdoc function
 * @name skillsJsApp.controller:SkillsController
 * @description
 * # SkillsController
 * Controller of the skillsJsApp
 */
angular.module('skillsJsApp')
    .controller('SkillsController', function ($scope, skillService, personService) {

        var unwatches = [];

        var watchAttributes = function() {
            unwatches = [];
            angular.forEach($scope.skills, function(skill, index) {
                unwatches.push($scope.$watch('skills['+index+']', function (newval, oldval) {
                    if((newval.interest !== oldval.interest) || (newval.expertise !== oldval.expertise)) {
                        skillService.save(newval);
                    }
                }, true));
            });
        };

        $scope.updateSkills = function () {
            angular.forEach(unwatches, function(unwatch) {unwatch();});
            $scope.skills = skillService.loadSkills($scope.personSelected.id);
            if ($scope.categorySelected) {
                $scope.skills = $scope.skills.filter(function (elem) {
                    return elem.categoryId === $scope.categorySelected;
                });
            }
            watchAttributes();
        };

        $scope.teamChanged = function () {
            $scope.persons = personService.loadPersonByTeam($scope.teamSelected.id);
            $scope.personSelected = $scope.persons[0];
            $scope.updateSkills();
        };


        $scope.categories = skillService.loadCategories();

        $scope.teams = personService.loadTeams();
        $scope.teamSelected = $scope.teams[0];
        $scope.teamChanged();
    });

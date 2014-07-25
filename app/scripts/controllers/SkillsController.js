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

        $scope.teamChanged = function () {
            $scope.persons = personService.loadPersonByTeam($scope.teamSelected.id);
            $scope.personSelected = $scope.persons[0];
            $scope.updateSkills();
        };

        $scope.updateSkills = function () {
            $scope.skills = skillService.loadSkillsForPerson($scope.personSelected.id);
            if ($scope.categorySelected) {
                $scope.skills = $scope.skills.filter(function (elem) {
                    return elem.categoryId === $scope.categorySelected;
                });
            }
        };

        $scope.categories = skillService.loadCategories();

        $scope.teams = personService.loadTeams();
        $scope.teamSelected = $scope.teams[0];
        $scope.teamChanged();

    });

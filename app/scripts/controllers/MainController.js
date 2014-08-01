'use strict';

/**
 * @ngdoc function
 * @name skillsJsApp.controller:SkillsController
 * @description
 * # SkillsController
 * Controller of the skillsJsApp
 */
angular.module('skillsJsApp')
    .controller('MainController', function ($scope, skillService, personService) {

        $scope.alerts = [];
        $scope.closeAlert = function (index) {
            $scope.alerts.splice(index, 1);
        };


        $scope.filterOptions = {
            filterText: ''
        };


        $scope.reloadSkills = function () {
            angular.forEach(unwatches, function (unwatch) {
                unwatch();
            });
            if ($scope.personSelected) {
                skillService.loadSkills($scope.personSelected.id).then(function (response) {
                    $scope.skills = response;
                    if ($scope.categorySelected) {
                        $scope.skills = $scope.skills.filter(function (elem) {
                            return elem.category.id === $scope.categorySelected;
                        });
                    }
                    watchAttributes();
                }).catch(function (error) {
                    errorAlert(error);
                });
            }
            else {
                $scope.skills = [];
            }
        };


        $scope.teamChanged = function () {
            personService.loadPersonByTeam($scope.teamSelected.id).then(function (response) {
                $scope.persons = response;
                $scope.personSelected = $scope.persons.length > 0 ? $scope.persons[0] : undefined;
                $scope.reloadSkills();
            }).catch(function (error) {
                errorAlert(error);
            });
        };


        personService.loadTeams().then(function (response) {
            $scope.teams = response;
            $scope.teamSelected = $scope.teams.length > 0 ? $scope.teams[0] : undefined;
            $scope.teamChanged();
        }).catch(function (error) {
            errorAlert(error);
        });


        skillService.loadCategories().then(function (response) {
            $scope.categories = response;
        }).catch(function (error) {
            errorAlert(error);
        });


        function errorAlert(msg) {
            $scope.alerts.push({ type: 'danger', msg: msg });
        }

        var unwatches = [];

        function watchAttributes() {
            unwatches = [];
            angular.forEach($scope.skills, function (skill, index) {
                unwatches.push($scope.$watch('skills[' + index + ']', function (newval, oldval) {
                    if ((newval.interest !== oldval.interest) || (newval.expertise !== oldval.expertise)) {
                        skillService.saveSkill(newval).catch(function (error) {
                            errorAlert(error);
                        });
                    }
                }, true));
            });
        }
    }
);

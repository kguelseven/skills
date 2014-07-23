'use strict';

/**
 * @ngdoc function
 * @name skillsJsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the skillsJsApp
 */
angular.module('skillsJsApp')
    .controller('MainController', function ($log, $scope, skillService, personService) {

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

        $scope.saveSkill = function(skill) {
            console.log(skill);
            console.log(skill.interesse);
            console.log(skill.expertise);
        }


        $scope.categories = skillService.loadCategories();

        $scope.teams = personService.loadTeams();
        $scope.teamSelected = $scope.teams[0];
            $scope.teamChanged();


        var getExpertiseCellTemplate = function (model) {
            return '<div class="ngCellText" ng-class="col.colIndex()"><span ng-cell-text> ' +
                '<rating ng-model=' + model + ' max="5" readonly="false" on-hover="hoveringOver(value)" on-leave="overStar = null"></rating>' +
                '</span> <button type="button" class="close" ng-click="saveSkill(row.entity)"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button></div>';
        };

        var columnDefs = [
            { field: 'id', displayName: '#', width: 90 },
            { field: 'skill', displayName: 'Skill', width: "*" },
            { field: 'category', displayName: 'Category', width: "*" },
            { field: 'interesse', displayName: 'Interesse', cellTemplate: getExpertiseCellTemplate('row.entity.interesse'), width: "15%" },
            { field: 'expertise', displayName: 'Expertise', cellTemplate: getExpertiseCellTemplate('row.entity.expertise'), width: "15%" }
        ];

        $scope.gridOptions = {data: 'skills', showFooter: true, showFilter: true, multiSelect: false, columnDefs: columnDefs, filterOptions: $scope.filterOptions};
    });

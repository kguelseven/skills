'use strict';

/**
 * @ngdoc function
 * @name skillsJsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the skillsJsApp
 */
angular.module('skillsJsApp')
    .controller('MainController', function ($scope, skillService, mitarbeiterService) {

        $scope.teamChanged = function () {
            $scope.mitarbeiters = mitarbeiterService.loadMitarbeiterByTeam($scope.teamSelected.id);
            $scope.mitarbeiterSelected = $scope.mitarbeiters[0];
            $scope.updateSkills();
        };


        $scope.updateSkills = function () {
            var kategorieSelected = null;
            if ($scope.kategorieSelected) {
                kategorieSelected = $scope.kategorieSelected.id;
            }
            $scope.skills = skillService.loadSkillsForMitarbeiterAndKategorie($scope.mitarbeiterSelected.id, kategorieSelected);
        };


        $scope.kategorien = skillService.loadKategorien();

        $scope.teams = mitarbeiterService.loadTeams();
        $scope.teamSelected = $scope.teams[0];
        $scope.teamChanged();


        var getExpertiseCellTemplate = function (model) {
            return '<div class="ngCellText" ng-class="col.colIndex()"><span ng-cell-text> ' +
                '<rating ng-model=' + model + ' max="3" readonly="false" on-hover="hoveringOver(value)" on-leave="overStar = null"></rating>' +
                '</span></div>';
        };

        var columnDefs = [
            { field: 'id', displayName: '#', width: 90 },
            { field: 'skill', displayName: 'Skill', width: "*" },
            { field: 'interesse', displayName: 'Interesse', cellTemplate: getExpertiseCellTemplate('row.entity.interesse'), width: "10%" },
            { field: 'expertise', displayName: 'Expertise', cellTemplate: getExpertiseCellTemplate('row.entity.expertise'), width: "10%" }
        ];

        $scope.gridOptions = {data: 'skills', showFooter: true, multiSelect: false, columnDefs: columnDefs};
    });

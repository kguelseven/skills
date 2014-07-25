'use strict';

/**
 * @ngdoc function
 * @name skillsJsApp.controller:SkillsGridController
 * @description
 * # SkillsGridController
 * Controller of the skillsJsApp
 */
angular.module('skillsJsApp')
    .controller('SkillsGridController', function ($scope) {

        $scope.clearExpertise = function(skill) {
            skill.expertise = 0;
        };

        $scope.clearInterest = function(skill) {
            skill.interest = 0;
        };

        $scope.changed = function(value) {
            console.log('changed = ' + value);
        };

        var getExpertiseCellTemplate = function () {
            return '<div class="ngCellText" ng-class="col.colIndex()"><span ng-cell-text>' +
                '<rating style="color: orange;" ng-model="row.entity.expertise" max="5" readonly="false" ng-change="changed(row.entity)"></rating>' +
                '<div class="pull-right"><button class="btn btn-xs btn-default" ng-hide="row.entity.expertise === 0" ng-click="clearExpertise(row.entity)">Clear</button></div>' +
                '</div></span></div>';
        };

        var getInteresseCellTemplate = function () {
            return '<div class="ngCellText" ng-class="col.colIndex()"><span ng-cell-text>' +
                '<rating style="color:red" ng-model="row.entity.interest" max="5" readonly="false" state-off="\'glyphicon-heart-empty\'" state-on="\'glyphicon-heart\'"></rating>' +
                '<div class="pull-right"><button class="btn btn-xs btn-default" ng-hide="row.entity.interest === 0" ng-click="clearInterest(row.entity)">Clear</button></div>' +
                '</div></span></div>';
        };

        var columnDefs = [
            { field: 'id', displayName: '#', width: 40 },
            { field: 'skill', displayName: 'Skill', width: "*" },
            { field: 'category', displayName: 'Kategorie', width: "20%" },
            { field: 'interest', displayName: 'Interesse', cellTemplate: getInteresseCellTemplate(), width: "15%" },
            { field: 'expertise', displayName: 'Expertise', cellTemplate: getExpertiseCellTemplate(), width: "15%" }
        ];

        $scope.selectedItems = [];
        $scope.gridOptions = {
            data: 'skills',
            showFooter: true,
            showFilter: true,
            multiSelect: false,
            selectedItems: $scope.selectedItems,
            footerRowHeight: 40,
            columnDefs: columnDefs
        };
    });

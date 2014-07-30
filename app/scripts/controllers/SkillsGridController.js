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

        var getExpertiseCellTemplate = function () {
            return '<div class="ngCellText" ng-class="col.colIndex()"><span ng-cell-text>' +
                '<rating class="ratingExpertise" ng-model="row.entity.expertise" max="5"></rating>' +
                '<div class="pull-right"><button class="btn btn-xs btn-default" ng-hide="row.entity.expertise === 0" ' +
                'ng-click="row.entity.expertise = 0">X</button></div>' +
                '</div></span></div>';
        };

        var getInteresseCellTemplate = function () {
            return '<div class="ngCellText" ng-class="col.colIndex()"><span ng-cell-text>' +
                '<rating class="ratingInteresse" ng-model="row.entity.interest" max="5" ' +
                'state-off="\'glyphicon-heart-empty\'" state-on="\'glyphicon-heart\'"></rating>' +
                '<div class="pull-right"><button class="btn btn-xs btn-default" ng-hide="row.entity.interest === 0" ' +
                'ng-click="row.entity.interest = 0">X</button></div>' +
                '</div></span></div>';
        };

        var columnDefs = [
            { field: 'name', displayName: 'Skill', width: "*" },
            { field: 'category.name', displayName: 'Kategorie', width: "20%" },
            { field: 'interest', displayName: 'Interesse', cellTemplate: getInteresseCellTemplate(), width: "20%" },
            { field: 'expertise', displayName: 'Expertise', cellTemplate: getExpertiseCellTemplate(), width: "20%" }
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

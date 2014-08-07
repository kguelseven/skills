'use strict';

/**
 * @ngdoc function
 * @name skillsJsApp.controller:MainGridController
 * @description
 * # MainGridController
 * Controller of the skillsJsApp
 */
angular.module('skillsJsApp')
    .controller('MainGridController', ['$scope', function ($scope) {

        function getExpertiseCellTemplate() {
            return '<div class="ngCellText" ng-class="col.colIndex()"><span ng-cell-text>' +
                '<span class="pull-right"><button class="btn btn-xs btn-default" ng-hide="row.entity.expertise === 0" ng-click="row.entity.expertise = 0">X</button></span>' +
                '<rating class="ratingExpertise" ng-model="row.entity.expertise" max="5"></rating>' +
                '</span></div>';
        }


        function getInteresseCellTemplate() {
            return '<div class="ngCellText" ng-class="col.colIndex()"><span ng-cell-text>' +
                '<span class="pull-right"><button class="btn btn-xs btn-default" ng-hide="row.entity.interest === 0" ng-click="row.entity.interest = 0">X</button></span>' +
                '<rating class="ratingInteresse" ng-model="row.entity.interest" max="5" state-off="\'glyphicon-heart-empty\'" state-on="\'glyphicon-heart\'"></rating>' +
                '</span></div>';
        }


        $scope.gridOptions = {
            data: 'skills',
            showFooter: true,
            showFilter: false,
            multiSelect: false,
            footerRowHeight: 40,
            sortInfo: {fields: ['category.name'], directions: ['asc']},
            columnDefs: [
                { field: 'name', displayName: 'Skill', width: "*" },
                { field: 'category.name', displayName: 'Kategorie', width: "200" },
                { field: 'interest', displayName: 'Interesse', cellTemplate: getInteresseCellTemplate(), width: "140" },
                { field: 'expertise', displayName: 'Expertise', cellTemplate: getExpertiseCellTemplate(), width: "140" }
            ],
            filterOptions: $scope.filterOptions
        };
    }]);

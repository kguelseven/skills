'use strict';

/**
 * @ngdoc function
 * @name skillsJsApp.controller:TeamsController
 * @description
 * # TeamsController
 * Controller of the skillsJsApp
 */
'use strict';

/**
 * @ngdoc function
 * @name skillsJsApp.controller:TeamsController
 * @description
 * # TeamsController
 * Controller of the skillsJsApp
 */
angular.module('skillsJsApp')
    .controller('TeamsGridController', ['$scope', 'personService', function ($scope, personService) {

        personService.loadTeams().then(function (response) {
            $scope.$parent.teams = response; // ng-grid bug? must explicitly set on parent.
            if ($scope.teams.length > 0) {
                angular.forEach($scope.$parent.teams, function (team) {
                    team.root = true;
                });
                // $scope.teamsGridOptions.selectItem(0, true);
                $scope.loadMembers($scope.teams[0]);
            }
            else {
                $scope.members = [];
            }
        }).catch(function (error) {
            $scope.errorAlert(error);
        });


        var teamStack = [];
        $scope.collapseTeam = function (team) {
            if (team.name === '<<') {
                var parent = teamStack.pop();
                console.log(parent);
                $scope.$parent.teams = parent.subteams;
            }
            else if (team.subteams && team.subteams.length > 0) {
                teamStack.push(team);
                $scope.$parent.teams = team.subteams;
            }
        };


        $scope.getTeamNameCellTemplate = function () {
            return '<div class="ngCellText" ng-class="col.colIndex()"><span ng-cell-text>' +
                '<a href="" ng-click="collapseTeam(row.entity)">{{row.entity.name}}</a></span>';
        };


        $scope.columnDefs = [
            { field: 'name', displayName: 'Name', cellTemplate: $scope.getTeamNameCellTemplate(), width: "*" },
            { field: '', displayName: '', sortable: false, cellTemplate: $scope.getEditCellTemplate(), width: '60'}
        ];

        $scope.teamsGridOptions = {
            data: 'teams',
            showFilter: false,
            multiSelect: false,
            sortInfo: {fields: ['name'], directions: ['asc']},
            columnDefs: 'columnDefs',
            filterOptions: $scope.filterOptions,
            afterSelectionChange: function (row) {
                if (row.selected === true) {
                    $scope.loadMembers(row.entity);
                }
            }
        };

    }]);

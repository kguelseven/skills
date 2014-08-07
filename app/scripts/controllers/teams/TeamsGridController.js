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
	.controller('TeamsGridController', ['$scope', '$timeout', 'personService', function ($scope, $timeout, personService) {

		personService.loadTeams().then(function (response) {
			$scope.$parent.teams = response; // ng-grid bug? must explicitly set on parent.
			if ($scope.$parent.teams.length > 0) {
				angular.forEach($scope.$parent.teams, function (team) {
					team.root = true;
				});

				$scope.loadMembers($scope.$parent.teams[0]);
			}
			else {
				$scope.members = [];
			}
		}).catch(function (error) {
			$scope.errorAlert(error);
		});


		$scope.teamsStack = [];
		$scope.goDown = function (team) {
			if ($scope.hasSubTeams(team)) {
				$scope.teamsStack.push($scope.$parent.teams);
				$scope.$parent.teams = team.subteams;
				$timeout(function() {$scope.teamsGridOptions.selectItem(0, true)});
			}
		};


		$scope.hasSubTeams = function (team) {
			return team.subteams && team.subteams.length > 0;
		};


		$scope.goUp = function () {
			$scope.$parent.teams = $scope.teamsStack.pop();
			$timeout(function() {$scope.teamsGridOptions.selectItem(0, true)});

		};


		$scope.getTeamNameCellTemplate = function () {
			return '<div class="ngCellText" ng-class="col.colIndex()">' +
				'<span ng-cell-text>' +
				'<span ng-show="hasSubTeams(row.entity)"><a href="" ng-click="goDown(row.entity)">{{row.entity.name}}</a></span>' +
				'<span ng-show="!hasSubTeams(row.entity)">{{row.entity.name}}</span>' +
				'</span>';
		};


		$scope.teamsGridOptions = {
			data: 'teams',
			showFilter: false,
			multiSelect: false,
			sortInfo: {fields: ['name'], directions: ['asc']},
			columnDefs: [
				{ field: 'name', displayName: 'Name', cellTemplate: $scope.getTeamNameCellTemplate(), width: "*" },
				{ field: '', displayName: '', sortable: false, cellTemplate: $scope.getEditCellTemplate(), width: '60'}
			],
			filterOptions: $scope.filterOptions,
			afterSelectionChange: function (row) {
				if (row.selected === true) {
					$scope.loadMembers(row.entity);
				}
			}
		};
	}]);

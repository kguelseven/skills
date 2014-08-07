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
	.controller('TeamsGridController', ['$scope', '$timeout', 'PersonService', function ($scope, $timeout, personService) {

		$scope.showAddTeamButton = true;
		$scope.addTeam = function () {
			showTeamInput(true);
		}

		$scope.team = null;
		$scope.save = function () {
			personService.saveTeam($scope.team).then(function (response) {
				$scope.$parent.teams.push(response);
				console.log('id?:' + JSON.stringify(response));
				$scope.team = null;
				showTeamInput(false);
			}).catch(function (error) {
				$scope.errorAlert(error);
			});
		}

		$scope.cancel = function () {
			showTeamInput(false);
		}

		$scope.delete = function (team) {
			console.log('deleting:' + JSON.stringify(team) );
			personService.deleteTeam(team.id).then(function (response) {
				var index = $scope.$parent.teams.indexOf(team);
				$scope.$parent.teams.splice(index, 1);
			}).catch(function (error) {
				$scope.errorAlert(error);
			});
		}

		$scope.teamDoesNotExist = function () {
			for (var i = 0; i < $scope.$parent.teams.length; i++) {
				if ($scope.$parent.teams[i].name === $scope.team.name) {
					return true;
				}
			}
			return false;
		}

		function showTeamInput(show) {
			$scope.showTeamInput = show;
			$scope.showAddTeamButton = !show;
		}

		$scope.teamsStack = [];
		$scope.goDown = function (team) {
			if ($scope.hasSubTeams(team)) {
				$scope.teamsStack.push($scope.$parent.teams);
				$scope.$parent.teams = team.subteams;
				$timeout(function () {
					$scope.teamsGridOptions.selectItem(0, true)
				});
			}
		};

		$scope.goUp = function () {
			$scope.$parent.teams = $scope.teamsStack.pop();
			$timeout(function () {
				$scope.teamsGridOptions.selectItem(0, true)
			});
		};

		$scope.hasSubTeams = function (team) {
			return team.subteams && team.subteams.length > 0;
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
				{ field: '', displayName: '', sortable: false, cellTemplate: $scope.getActionsCellTemplate(), width: '60'}
			],
			filterOptions: $scope.filterOptions,
			afterSelectionChange: function (row) {
				if (row.selected === true) {
					$scope.loadMembers(row.entity);
				}
			}
		};

		personService.loadTeams().then(function (response) {
			$scope.$parent.teams = response; // ng-grid bug? must be set on parent.
			if ($scope.$parent.teams.length > 0) {
				$scope.loadMembers($scope.$parent.teams[0]);
				$timeout(function () {
					$scope.teamsGridOptions.selectItem(0, true)
				});
			}
			else {
				$scope.members = [];
			}
		}).catch(function (error) {
			$scope.errorAlert(error);
		});

	}]);

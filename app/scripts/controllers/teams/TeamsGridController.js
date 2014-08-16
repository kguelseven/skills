'use strict';

/**
 * @ngdoc function
 * @name skillsJsApp.controller:TeamsGridController
 * @description
 * # TeamsGridController
 * Controller of the skillsJsApp
 */
angular.module('skillsJsApp')
	.controller('TeamsGridController', ['$scope', '$timeout', 'PersonService', 'Focus', function ($scope, $timeout, personService, focusService) {

		$scope.teamEdited = null;
		$scope.parentTeamStack = [];
		$scope.showAddTeamButton = true;

		$scope.addTeam = function () {
			$scope.teamEdited = {};
			var parent = $scope.getParentTeam();
			$scope.teamEdited.parentId = parent ? parent.id : null;
			showTeamEdit(true);
		};

		$scope.cancel = function () {
			showTeamEdit(false);
		};

		$scope.save = function () {
			var addOrUpdate = $scope.teamEdited.id ? personService.updateTeam : personService.addTeam;
			addOrUpdate($scope.teamEdited).then(function (team) {
				loadTeams(team.parentId, 0);
				showTeamEdit(false);
			}).catch(function (error) {
				$scope.errorAlert(error);
			});
		};

		$scope.delete = function (team) {
			personService.deleteTeam(team.id).then(function (response) {
				loadTeams(team.parentId, 0);
			}).catch(function (error) {
				$scope.errorAlert(error);
			});
		};

		$scope.edit = function (team) {
			$scope.teamEdited = angular.copy(team);
			showTeamEdit(true);
		};

		$scope.isValidTeam = function () { //review
			if (!$scope.$parent.teams) {
				return true;
			}
			for (var i = 0; i < $scope.$parent.teams.length; i++) {
				if ($scope.$parent.teams[i].name === $scope.teamEdited.name &&
					$scope.$parent.teams[i] !== $scope.teamEdited) {
					return true;
				}
			}
			return false;
		};

		function showTeamEdit(show) {
			$scope.showTeamInput = show;
			$scope.showAddTeamButton = !show;
			if (show) {
				focusService('teamEdited.name');
			}
			else {
				$scope.teamEdited = null;
			}
		}

		$scope.goDown = function (row, evt) {
			$scope.parentTeamStack.push({index: row.rowIndex, team: row.entity});
			loadTeams(row.entity.id, 0);
		};

		$scope.goUp = function () {
			var entry = $scope.parentTeamStack.pop();
			loadTeams(entry.team.parentId, entry.index);
		};

		$scope.getParentTeam = function () {
			if ($scope.parentTeamStack.length > 0) {
				return $scope.parentTeamStack[$scope.parentTeamStack.length - 1].team;
			}
		};

		$scope.getTeamNameCellTemplate = function () {
			return '<div class="ngCellText" ng-class="col.colIndex()">' +
				'<span ng-cell-text>' +
				'<span><a href="" ng-click="$event.stopPropagation(); goDown(row);">{{row.entity.name}}</a></span>';
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
					$scope.loadMembers(row.entity, 0);
				}
			}
		};

		function loadTeams(parentId, selectRowIndex) {
			personService.loadTeams(parentId).then(function (response) {
				$scope.$parent.teams = response; // ng-grid? must be set on parent.
				if ($scope.$parent.teams.length > 0) {
					$scope.loadMembers($scope.$parent.teams[0], 0);
					$timeout(function () {
						$scope.teamsGridOptions.selectRow(selectRowIndex, true);
					});
				}
				else {
					$scope.$parent.noTeamSelected();
				}
			}).catch(function (error) {
				$scope.errorAlert(error);
			});
		}

		loadTeams(undefined, 0);
	}])
;

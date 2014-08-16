'use strict';

/**
 * @ngdoc function
 * @name skillsJsApp.controller:TeamsController
 * @description
 * # TeamsController
 * Controller of the skillsJsApp
 */
angular.module('skillsJsApp')
	.controller('TeamsController', ['$scope', '$timeout', 'PersonService', 'Focus', function ($scope, $timeout, personService, focusService) {


		$scope.memberEdited = null;
		$scope.showAddMemberButton = true;

		$scope.addMember = function () {
			$scope.memberEdited = {teamId: $scope.teamSelected.id };
			showMemberEdit(true);
		};

		$scope.cancel = function () {
			showMemberEdit(false);
		};

		$scope.save = function () {
			var addOrUpdate = $scope.memberEdited.id ? personService.updateMember : personService.addMember;
			addOrUpdate($scope.memberEdited).then(function (member) {
				$scope.loadMembers($scope.teamSelected, 0);
				showMemberEdit(false);
			}).catch(function (error) {
				$scope.errorAlert(error);
			});
		};

		$scope.delete = function (member) {
			personService.deleteMember(member.id).then(function (response) {
				$scope.loadMembers($scope.teamSelected, 0);
			}).catch(function (error) {
				$scope.errorAlert(error);
			});
		};

		$scope.edit = function (member) {
			$scope.memberEdited = angular.copy(member);
			showMemberEdit(true);
		};

		$scope.alerts = [];
		$scope.closeAlert = function (index) {
			$scope.alerts.splice(index, 1);
		};

		$scope.errorAlert = function (msg) {
			$scope.alerts.push({ type: 'danger', msg: msg });
		};

		$scope.loadMembers = function (team, selectRowIndex) {
			$scope.teamSelected = team;
			personService.loadPersonsByTeam(team.id).then(function (response) {
				$scope.members = response;
				$timeout(function () {
					$scope.membersGridOptions.selectRow(selectRowIndex, true);
				});
			}).catch(function (error) {
				$scope.errorAlert(error);
			});
		};

		$scope.noTeamSelected = function () {
			$scope.teamSelected = undefined;
			$scope.showAddMemberButton = false;
			$scope.members = [];
		};

		$scope.getActionsCellTemplate = function () {
			return '<div class="ngCellText actionCell" ng-class="col.colIndex()">' +
				'<span ng-cell-text>' +
				'<button type="button" class="btn btn-default btn-xs" ng-click="edit(row.entity);"><span class="glyphicon glyphicon-pencil"></span></button> ' +
				'<button type="button" class="btn btn-default btn-xs" ng-click="$event.stopPropagation(); delete(row.entity);"><span class="glyphicon glyphicon-remove text-danger"></span></button>' +
				'</span></div>';
		};

		$scope.membersGridOptions = {
			data: 'members',
			showFilter: false,
			multiSelect: false,
			sortInfo: {fields: ['surname'], directions: ['asc']},
			columnDefs: [
				{ field: 'name', displayName: 'Vorname', width: "*" },
				{ field: 'surname', displayName: 'Name', width: "*" },
				{ field: '', displayName: '', sortable: false, cellTemplate: $scope.getActionsCellTemplate(), width: "60"}
			],
			filterOptions: $scope.filterOptions
		};

		function showMemberEdit(show) {
			$scope.showMemberInput = show;
			$scope.showAddMemberButton = !show;
			if (show) {
				focusService('memberEdited.name');
			}
			else {
				$scope.memberEdited = null;
			}
		}

	}]);

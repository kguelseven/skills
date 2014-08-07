'use strict';

/**
 * @ngdoc function
 * @name skillsJsApp.controller:TeamsController
 * @description
 * # TeamsController
 * Controller of the skillsJsApp
 */
angular.module('skillsJsApp')
	.controller('TeamsController', ['$scope', 'PersonService', function ($scope, personService) {

		$scope.getActionsCellTemplate = function () {
			return '<div class="ngCellText" ng-class="col.colIndex()">' +
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

		$scope.alerts = [];
		$scope.closeAlert = function (index) {
			$scope.alerts.splice(index, 1);
		};

		$scope.errorAlert = function (msg) {
			$scope.alerts.push({ type: 'danger', msg: msg });
		};

		$scope.loadMembers = function (team) {
			$scope.teamSelected = team.name;
			personService.loadPersonsByTeam(team.id).then(function (response) {
				$scope.members = response;
				return $scope.members;
			}).catch(function (error) {
				$scope.errorAlert(error);
			});
		};

	}]);

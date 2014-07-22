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
			$scope.mitarbeiterChanged();
		};

		$scope.mitarbeiterChanged = function () {
			$scope.skills = skillService.loadSkillsByMitarbeiter($scope.mitarbeiterSelected.id);
		};

		// $scope.predicate = '-name';


		$scope.teams = mitarbeiterService.loadTeams();
		$scope.teamSelected = $scope.teams[0];
		$scope.teamChanged();


		$scope.gridOptions = {data: 'skills', showFooter: true, maxHeight: 10000};
	});

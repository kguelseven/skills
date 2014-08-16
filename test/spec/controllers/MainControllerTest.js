'use strict';

describe('Controller: MainController', function () {

	var scope, httpBackend, createController;

	// load the controller's module
	beforeEach(angular.mock.module('skillsJsApp', function ($provide) {
		$provide.constant('REST_URL', '');
	}));

	beforeEach(angular.mock.inject(function ($rootScope, $httpBackend, $controller) {

			// create an empty scope
			scope = $rootScope.$new();

			// configure the backend
			httpBackend = $httpBackend;

			httpBackend.whenGET('/team').respond([
				{id: 1, name: 'T1'}
			]);
			httpBackend.whenGET('/categories').respond({});
			httpBackend.whenGET('/person/1').respond([
				{id: 1, name: 'Hanso'}
			]);
			httpBackend.when('GET', '/skills/1').respond([
				{id: 1, name: 'Karma', interest: 1}
			]);


			createController = function () {
				return $controller('MainController', {$scope: scope});
			};
		})
	);

	afterEach(function () {
		httpBackend.verifyNoOutstandingExpectation();
		httpBackend.verifyNoOutstandingRequest();
	});


	it('should not have any alerts initially', function () {
		createController();
		expect(scope.alerts.length).toBe(0);
		httpBackend.flush();

	});

	it('should load Teams initially', function () {
		httpBackend.expectGET('/team');
		httpBackend.expectGET('/categories');
		httpBackend.expectGET('/person/1');
		httpBackend.expectGET('/skills/1');
		createController();
		httpBackend.flush();
	});
});

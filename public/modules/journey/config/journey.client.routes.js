'use strict';

//Setting up route
angular.module('journey').config(['$stateProvider',
	function($stateProvider) {
		// Journey state routing
		$stateProvider.
		state('edit-journey', {
			url: '/journeys/edit-journey',
			templateUrl: 'modules/journey/views/edit-journey.client.view.html',
			controller:	'JourneyController'
		}).
		state('view-journey', {
			url: '/journeys/view-journey',
			templateUrl: 'modules/journey/views/view-journey.client.view.html',
			controller:	'JourneyController'
		}).
		state('add-journey', {
			url: '/journeys/add-journey',
			templateUrl: 'modules/journey/views/add-journey.client.view.html',
			controller:	'JourneyController'
		}).
		state('search-journey', {
			url: '/journeys/search-journey',
			templateUrl: 'modules/journey/views/search-journey.client.view.html',
			controller:	'SearchController'
		});
	}
]);

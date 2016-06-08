'use strict';

//Setting up route
angular.module('journey').config(['$stateProvider',
	function($stateProvider) {
		// Journey state routing
		$stateProvider.
		state('add-route', {
			url: '/routes/add-route',
			templateUrl: 'modules/journey/views/add-routes.client.view.html',
			controller:	'JourneyController'
		}).
		state('search-routes', {
			url: '/rides/search-routes',
			templateUrl: 'modules/journey/views/search-routes.client.view.html'
		}).
		state('rides', {
			url: '/rides',
			templateUrl: 'modules/journey/views/rides.client.view.html'
		}).
		state('routes', {
			url: '/routes',
			templateUrl: 'modules/journey/views/routes.client.view.html'
		});
	}
]);

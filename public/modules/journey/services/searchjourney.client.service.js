'use strict';

angular.module('journey').factory('SearchJourneyService', ['$resource',
	function($resource) {
		return $resource('journeys', {
				read: {
					method: 'GET'
				}
			}
		);
	}
]);

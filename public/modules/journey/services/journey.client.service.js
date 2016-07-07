'use strict';

//Products service used to communicate Journey REST endpoints
angular.module('journey').factory('Journey', ['$resource',
	function($resource) {
		return $resource('journeys/:journeyId', { journeyId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]).service('popupService',function($window){
	this.showPopup=function(message){
		return $window.confirm(message);
	};
});


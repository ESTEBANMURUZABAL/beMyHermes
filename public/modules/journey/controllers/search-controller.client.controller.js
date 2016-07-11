'use strict';

angular.module('journey').controller('SearchController', ['$scope','Journey', 'Users', '$filter', '$location', '$http', 'SearchJourneyService',
	function($scope, Journey, Users, $filter, $location, $http, SearchJourneyService) {

		// PAGINATION
		$scope.currentPage = 1;
		$scope.pageSize = 10;
		$scope.offset = 0;

		$scope.pageChanged = function() {
			$scope.offset = ($scope.currentPage - 1) * $scope.pageSize;
		};
		// PAGINATION

		$scope.fetchFindStart = function() {
			var address = $scope.findStartAddressModel.replace(' ', '%20');
			$http.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + address).then(function(response) {
				if ((response.data !== undefined) && (response.data.status = 'OK') && (response.data.results !== undefined) && (response.data.results[0].geometry !== undefined) && (response.data.results[0].address_components !== undefined)) {
					$scope.findOriginData = response.data.results[0];
					$scope.isTypingSearchQuery = true;
				}
			});
		};

		$scope.fetchFindEnd = function() {
			var address = $scope.findEndAddressModel.replace(' ', '%20');
			$http.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + address).then(function(response) {
				if ((response.data !== undefined) && (response.data.status = 'OK') && (response.data.results !== undefined) && (response.data.results[0].geometry !== undefined) && (response.data.results[0].address_components !== undefined)) {
					$scope.findDestinationData = response.data.results[0];
					$scope.isTypingSearchQuery = true;
				}
			});
		};
/*

        $scope.searchData = function() {
            if(!$scope.findStartAddressModel) {
                this.searchByBounds($scope.findDestinationData);
            } else if(!$scope.findEndAddressModel) {
                this.searchByBounds($scope.findOriginData);
            } else {
                this.searchByBounds($scope.findOriginData, $scope.findDestinationData);
            }
        };
*/

		// Find all journeys
		$scope.findAllJourneys = function() {
			$scope.journeys = Journey.query();
		};

        // Search for a journey
		$scope.journeySearch = function(journey) {
			$location.path('journeys/' + journey._id);
		};

        $scope.go = function ( path ) {
            $location.path( path );
        };

	}
]);

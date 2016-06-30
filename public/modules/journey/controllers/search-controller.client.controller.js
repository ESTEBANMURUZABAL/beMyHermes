'use strict';

angular.module('journey').controller('SearchController', ['$scope','Journey', 'Users', '$filter', '$location', '$http', 'SearchJourneyService',
	function($scope, Journey, Users, $filter, $location, $http, SearchJourneyService) {

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

        $scope.searchData = function() {
            if(!$scope.findStartAddressModel) {
                this.searchByBounds($scope.findDestinationData);
            } else if(!$scope.findEndAddressModel) {
                this.searchByBounds($scope.findOriginData);
            } else {
                this.searchByBounds($scope.findOriginData, $scope.findDestinationData);
            }
        };

        $scope.searchByDate = function(searchDateModel) {
            $http({
                method: 'GET',
                url: '/journeys',
                params: {journeyDate: searchDateModel }
            }).
                success(function(data, status, headers, config) {
                    console.log(data);
                    $scope.journeys = data;
                    $scope.searchDateModel = '';

                }).
                error(function(data, status, headers, config) {
                    console.log(data);
                });
        };


        $scope.searchByBounds = function(journeyData) {
            if (journeyData && journeyData.geometry && journeyData.geometry.bounds) {
                $http({
                    method: 'GET',
                    url: '/api/journeys',
                    params: {nelng: journeyData.geometry.bounds.northeast.lng, swlng: journeyData.geometry.bounds.southwest.lng,nelat: journeyData.geometry.bounds.northeast.lat, swlat: journeyData.geometry.bounds.southwest.lat}
                }).
                    success(function(data, status, headers, config) {
                        console.log(data);
                        $scope.journeys = data;
                        $scope.isTypingSearchQuery = false;
                        $scope.findStartAddressModel = '';
                        $scope.findEndAddressModel = '';
                        $scope.findOriginData = '';
                    }).
                    error(function(data, status, headers, config) {
                        console.log(data);
                    });
            }
        };

        $scope.searchByBounds = function(originData, destinationData ) {
            if (originData && originData.geometry && originData.geometry.bounds) {
                $http({
                    method: 'GET',
                    url: '/journeys',
                    params: {nelng: originData.geometry.bounds.northeast.lng, swlng: originData.geometry.bounds.southwest.lng,nelat: originData.geometry.bounds.northeast.lat, swlat: originData.geometry.bounds.southwest.lat}
                })
                    .success(function() {
                        $http({
                            method: 'GET',
                            url: '/journeys',
                            params: {nelng: destinationData.geometry.bounds.northeast.lng, swlng: destinationData.geometry.bounds.southwest.lng,nelat: destinationData.geometry.bounds.northeast.lat, swlat: destinationData.geometry.bounds.southwest.lat}
                        });
                    })
                        .success(function(data, status, headers, config) {
                            console.log(data);
                            $scope.journeys = data;
                            $scope.isTypingSearchQuery = false;
                            $scope.findStartAddressModel = '';
                            $scope.findEndAddressModel = '';
                            $scope.findOriginData = '';
                            $scope.findDestinationData = '';
                        }).
                            error(function(data, status, headers, config) {
                                console.log(data);
                            });
            }
        };

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

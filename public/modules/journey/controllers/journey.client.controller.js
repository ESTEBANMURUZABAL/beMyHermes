'use strict';

// Journey controller
angular.module('journey').controller('JourneyController', ['$scope', '$stateParams', '$location', 'Authentication', 'Journey', 'Users', '$filter', '$http',
	function($scope, $stateParams, $location, Authentication, Journey, Users, $filter, $http) {
		$scope.authentication = Authentication;
		$scope.user = Users.query();
		$scope.currentPage = 1;
		$scope.pageSize = 10;
		$scope.offset = 0;

		// Page changed handler
		$scope.pageChanged = function() {
			$scope.offset = ($scope.currentPage - 1) * $scope.pageSize;
		};


        // Object to store form data
        $scope.journeyObject = {};

        // function to post joureys
        $scope.postJourney = function() {
            $scope.postError = '';
            var newJourney = new Journey();
            newJourney.startStreet = $scope.startLocation;
            newJourney.startArea = $scope.startArea;
            newJourney.startCity = $scope.startCity;
            newJourney.startAddress = $scope.startAddress;
            newJourney.startCoordLat = $scope.startCoordLat;
            newJourney.startCoordLng = $scope.startCoordLng;
            newJourney.endStreet = $scope.endLocation;
            newJourney.endArea = $scope.endArea;
            newJourney.endCity = $scope.endCity;
            newJourney.endAddress = $scope.endAddress;
            newJourney.endCoordLat = $scope.endCoordLat;
            newJourney.endCoordLng = $scope.endCoordLng;
            newJourney.departure = $scope.journeyObject.departure;
            newJourney.vehicle = $scope.journeyObject.vehicle;
            newJourney.availableSeats = $scope.journeyObject.availableSeats;
            newJourney.genderPreference = $scope.journeyObject.genderPreference;
            newJourney.description = $scope.journeyObject.description;
            newJourney.fare = $scope.journeyObject.fare;
            //console.log(newJourney.genderPreference);
            newJourney.$save($scope.journeyObject, function(tweet) {
                console.log(tweet);
                if (!tweet.departure) {
                    $scope.postError = 'Please fill all fields correctly!';
                } else {
                    window.location = '/';
                }
            }, function(err) {
                console.log(err);
                $scope.postError = 'Error in posting';
            })
        };

        /* MAP CONFIGURATIONS */
        /* START MAP */
        $scope.startMap = {
            center: {
                latitude: -27.4459738,
                longitude: -58.9789171
            },
            zoom: 8
        };
        $scope.fetchStart = function() {
            var address = $scope.startAddressModel.replace(' ', '%20');
            $http.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + address).then(function(response) {
                if ((response.data != undefined) && (response.data.status = 'OK') && (response.data.results != undefined) && (response.data.results[0].geometry != undefined) && (response.data.results[0].address_components != undefined)) {
                    $scope.startMap.center.latitude = response.data.results[0].geometry.location.lat;
                    $scope.startMap.center.longitude = response.data.results[0].geometry.location.lng;
                    $scope.startMarker.coords.latitude = response.data.results[0].geometry.location.lat;
                    $scope.startMarker.coords.longitude = response.data.results[0].geometry.location.lng;
                    $scope.startMap.zoom = 14;
                    $scope.startLocation = response.data.results[0].formatted_address.split(',')[0];
                    $scope.startArea = response.data.results[0].formatted_address.split(',')[1];
                    var len = response.data.results[0].formatted_address.split(',').length;
                    $scope.startCity = response.data.results[0].formatted_address.split(',')[len - 3];
                    $scope.startAddress = response.data.results[0].formatted_address;
                    $scope.startCoordLat = response.data.results[0].geometry.location.lat;
                    $scope.startCoordLng = response.data.results[0].geometry.location.lng;
                }
            });
        };
        $scope.fetchFindStart = function() {
            var address = $scope.findStartAddressModel.replace(' ', '%20');
            $http.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + address).then(function(response) {
                if ((response.data != undefined) && (response.data.status = 'OK') && (response.data.results != undefined) && (response.data.results[0].geometry != undefined) && (response.data.results[0].address_components != undefined)) {
                    $scope.findData = response.data.results[0];
                    $scope.isTypingSearchQuery = true;
                }
            });
        };
        $scope.searchByBounds = function() {
            if ($scope.findData && $scope.findData.geometry && $scope.findData.geometry.bounds) {
                $http({
                    method: 'GET',
                    url: '/api/journeys',
                    params: {nelng: $scope.findData.geometry.bounds.northeast.lng, swlng: $scope.findData.geometry.bounds.southwest.lng,nelat: $scope.findData.geometry.bounds.northeast.lat, swlat: $scope.findData.geometry.bounds.southwest.lat}
                }).
                    success(function(data, status, headers, config) {
                        console.log(data);
                        $scope.journeys = data;
                        $scope.isTypingSearchQuery = false;
                        $scope.findStartAddressModel = '';
                        $scope.findData = {};
                    }).
                    error(function(data, status, headers, config) {
                        console.log(data);
                    })
            }else{
                // If no search query load stored journeys
                $scope.journeys = _commutr.journeys;
            }
        };

        $scope.startMarker = {
            id: 0,
            coords: {
                latitude: 0,
                longitude: 0
            },
            options: {
                draggable: true
            },
            events: {
                dragend: function(marker, eventName, args) {
                    marker.coords = $scope.startMap.center;
                    $scope.startMarker.options = {
                        draggable: true,
                        labelContent: "lat: " + $scope.startMarker.coords.latitude + ' ' + 'lon: ' + $scope.startMarker.coords.longitude,
                        labelAnchor: "100 0",
                        labelClass: "marker-labels"
                    };
                }
            }
        };
        /* end MAP */
        $scope.endMap = {
            center: {
                latitude: -27.4459738,
                longitude: -58.9789171
            },
            zoom: 8
        };
        $scope.fetchend = function() {
            var address = $scope.endAddressModel.replace(' ', '%20');
            $http.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + address).then(function(response) {
                if ((response.data != undefined) && (response.data.status = 'OK') && (response.data.results != undefined) && (response.data.results[0].geometry != undefined) && (response.data.results[0].address_components != undefined)) {
                    $scope.endMap.center.latitude = response.data.results[0].geometry.location.lat;
                    $scope.endMap.center.longitude = response.data.results[0].geometry.location.lng;
                    $scope.endMarker.coords.latitude = response.data.results[0].geometry.location.lat;
                    $scope.endMarker.coords.longitude = response.data.results[0].geometry.location.lng;
                    $scope.endMap.zoom = 14;
                    $scope.endLocation = response.data.results[0].formatted_address.split(',')[0];
                    $scope.endArea = response.data.results[0].formatted_address.split(',')[1];
                    var len = response.data.results[0].formatted_address.split(',').length;
                    $scope.endCity = response.data.results[0].formatted_address.split(',')[len - 3];
                    $scope.endAddress = response.data.results[0].formatted_address;
                    $scope.endCoordLat = response.data.results[0].geometry.location.lat;
                    $scope.endCoordLng = response.data.results[0].geometry.location.lng;
                }
            });
        };

        $scope.endMarker = {
            id: 0,
            coords: {
                latitude: 0,
                longitude: 0
            },
            options: {
                draggable: true
            },
            events: {
                dragend: function (marker, eventName, args) {
                    marker.coords = $scope.endMap.center;
                    $scope.endMarker.options = {
                        draggable: true,
                        labelContent: "lat: " + $scope.endMarker.coords.latitude + ' ' + 'lon: ' + $scope.endMarker.coords.longitude,
                        labelAnchor: "100 0",
                        labelClass: "marker-labels"
                    };
                }
            }
        }
	}
]);

angular.module('journey').config(function(uiGmapGoogleMapApiProvider) {
        uiGmapGoogleMapApiProvider.configure({
            key: 'AIzaSyAHDaqc7kYHlL1IujnpczF_PT-iiaqn1AQ',
            v: '3.20', //defaults to latest 3.X anyhow
            libraries: 'weather,geometry,visualization'
        });
    }
);

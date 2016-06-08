'use strict';

// Journey controller
angular.module('journey').controller('JourneyController', ['$scope', '$stateParams', '$location', 'Authentication', 'Journey', 'Users', '$filter', '$http',
	function($scope, $stateParams, $location, Authentication, Journey, Users, $filter, $http) {

        $scope.journeyObject = {};




        // function to post joureys
        $scope.postJourney = function() {
            $scope.postError = '';
            var newJourney = new Journey();
            newJourney.startStreet = $scope.startLocation;
            newJourney.startArea = $scope.startArea;
            newJourney.startCity = $scope.startCity;
            newJourney.startAddress = $scope.startAddress;

            newJourney.endStreet = $scope.endLocation;
            newJourney.endArea = $scope.endArea;
            newJourney.endCity = $scope.endCity;
            newJourney.endAddress = $scope.endAddress;
            newJourney.departure = $scope.journeyObject.departure;
            
            newJourney.vehicle = $scope.journeyObject.vehicle;
            newJourney.availableSeats = $scope.journeyObject.availableSeats;
            newJourney.genderPreference = $scope.journeyObject.genderPreference;
            newJourney.description = $scope.journeyObject.description;
            newJourney.fare = $scope.journeyObject.fare;

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
                latitude: 0,
                longitude: 0
            },
            zoom: 8
        };

        $scope.fetchStartAddress = function() {
            console.log('funciona');
            var address = $scope.startAddressModel.replace(' ', '%20');
            $scope.mensaje = address;
            $http.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + address).then(function(response) {

                if ((response.data != undefined) && (response.data.status = 'OK') && (response.data.results != undefined) && (response.data.results[0].geometry != undefined) && (response.data.results[0].address_components != undefined)) {
                    $scope.startMap.center.latitude = response.data.results[0].geometry.location.lat;
                    $scope.startMap.center.longitude = response.data.results[0].geometry.location.lng;
                    $scope.startMap.zoom = 14;
                    $scope.startLocation = response.data.results[0].formatted_address.split(',')[0];
                    $scope.startArea = response.data.results[0].formatted_address.split(',')[1];
                    var len = response.data.results[0].formatted_address.split(',').length;
                    $scope.startCity = response.data.results[0].formatted_address.split(',')[len - 3];
                    $scope.startAddress = response.data.results[0].formatted_address;
                }
            });
        };

        /* end MAP */
        $scope.endMap = {
            center: {
                latitude: 0,
                longitude: 0
            },
            zoom: 8
        };

        $scope.fetchEndAddress = function() {
            var address = $scope.endAddressModel.replace(' ', '%20');
            $http.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + address).then(function(response) {
                if ((response.data != undefined) && (response.data.status = 'OK') && (response.data.results != undefined) && (response.data.results[0].geometry != undefined) && (response.data.results[0].address_components != undefined)) {
                    $scope.endMap.center.latitude = response.data.results[0].geometry.location.lat;
                    $scope.endMap.center.longitude = response.data.results[0].geometry.location.lng;
                    $scope.endMap.zoom = 14;
                    $scope.endLocation = response.data.results[0].formatted_address.split(',')[0];
                    $scope.endArea = response.data.results[0].formatted_address.split(',')[1];
                    var len = response.data.results[0].formatted_address.split(',').length;
                    $scope.endCity = response.data.results[0].formatted_address.split(',')[len - 3];
                    $scope.endAddress = response.data.results[0].formatted_address;
                }
            });
        };



	}
]);



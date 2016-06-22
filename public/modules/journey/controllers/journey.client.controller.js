'use strict';

// Journey controller
angular.module('journey').controller('JourneyController', ['$scope', '$stateParams', '$location', 'Authentication', 'Journey', 'Users', '$filter', '$http',
    function($scope , $stateParams, $location, Authentication, Journey, Users, $filter, $http) {

        $scope.journeyObject = {};
        $scope.frequency = '';

        $scope.weeklyJourney = {
            monday : {
                name: 'Monday',
                departureDate : '',
                arrivalDate : '',
                selected: false
            },
            tuesday : {
                name: 'Tuesday',
                departureDate : '',
                arrivalDate : '',
                selected: false
                },
            wednesday : {
                name: 'Wednesday',
                departureDate : '',
                arrivalDate : '',
                selected: false
            },
            thursday : {
                name: 'Thursday',
                departureDate : '',
                arrivalDate : '',
                selected: false
            },
            friday : {
                name: 'Friday',
                departureDate : '',
                arrivalDate : '',
                selected: false
            },
            saturday : {
                name: 'Saturday',
                departureDate : '',
                arrivalDate : '',
                selected: false
            },
            sunday : {
                name: 'Sunday',
                departureDate : '',
                arrivalDate : '',
                selected: false
            }
        };

        $scope.dayJourney = {
            departureDate : '',
            arrivalDate : ''
        };

        // function to post journeys
        $scope.create = function() {
            $scope.postError = '';
            var newJourney = new Journey();

            newJourney.startStreet = $scope.startStreet;
            newJourney.startCoordLat = $scope.startCoordLat;
            newJourney.startCoordLng = $scope.startCoordLng;
            newJourney.startArea = $scope.startArea;
            newJourney.startCity = $scope.startCity;
            newJourney.startAddress = $scope.startAddress;

            newJourney.endStreet = $scope.endStreet;
            newJourney.endCoordLat = $scope.endCoordLat;
            newJourney.endCoordLng = $scope.endCoordLng;
            newJourney.endArea = $scope.endArea;
            newJourney.endCity = $scope.endCity;
            newJourney.endAddress = $scope.endAddress;

            if($scope.frequency) {
                newJourney.dayJourney = {
                    departureDate : $scope.dayJourney.departureDate,
                    arrivalDate : $scope.dayJourney.arrivalDate
                };
                newJourney.isDayOnly = true;
            } else {
                angular.forEach($scope.weeklyJourney, function(value) {
                    if(value.selected){
                        newJourney.weeklyJourney = {
                            value: {
                                departureDate: $scope.weeklyJourney.value.departureDate,
                                arrivalDate: $scope.weeklyJourney.value.arrivalDate
                            }
                        };
                    }
                });
            }

            newJourney.availableSeats = $scope.availableSeats;
            newJourney.description = $scope.description;
            newJourney.suggestedTip = $scope.suggestedTip;
            newJourney.$save(function (response) {

            }, function (errorResponse) {
                console.log(errorResponse);
                $scope.error = errorResponse.data.message;
            });
        };

        $scope.fetchStartAddress = function() {
            var address = $scope.startAddressModel.replace(' ', '%20');
            $http.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + address).then(function(response) {
                if ((response.data !== undefined) && (response.data.status = 'OK') && (response.data.results !== undefined) && (response.data.results[0].geometry !== undefined) && (response.data.results[0].address_components !== undefined)) {
                    $scope.startCoordLat = response.data.results[0].geometry.location.lat;
                    $scope.startCoordLng = response.data.results[0].geometry.location.lng;
                    $scope.startStreet = response.data.results[0].formatted_address.split(',')[0];
                    $scope.startArea = response.data.results[0].formatted_address.split(',')[1];
                    var len = response.data.results[0].formatted_address.split(',').length;
                    $scope.startCity = response.data.results[0].formatted_address.split(',')[len - 3];
                    $scope.startAddress = response.data.results[0].formatted_address;
                }
            });
        };

        $scope.fetchEndAddress = function() {
            var address = $scope.endAddressModel.replace(' ', '%20');
            $http.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + address).then(function(response) {
                if ((response.data !== undefined) && (response.data.status === 'OK') && (response.data.results !== undefined) && (response.data.results[0].geometry !== undefined) && (response.data.results[0].address_components !== undefined)) {
                    $scope.endCoordLat = response.data.results[0].geometry.location.lat;
                    $scope.endCoordLng = response.data.results[0].geometry.location.lng;
                    $scope.endStreet = response.data.results[0].formatted_address.split(',')[0];
                    $scope.endArea = response.data.results[0].formatted_address.split(',')[1];
                    var len = response.data.results[0].formatted_address.split(',').length;
                    $scope.endCity = response.data.results[0].formatted_address.split(',')[len - 3];
                    $scope.endAddress = response.data.results[0].formatted_address;
                }
            });
        };

        // Find all journeys
        $scope.findAllJourneys = function() {
            $scope.journeys = Journey.query();
        };

        // Search for date
        $scope.journeySearchForDate = function(journey) {
            $location.path('journey/' + journey._id);
        };
    }
]);

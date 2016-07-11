'use strict';

// Journey controller
angular.module('journey').controller('JourneyController',
    ['$scope', '$stateParams', '$location', 'Authentication', 'Journey', 'Users', '$filter', '$http', /*'$Modal', '$log',*/
    function($scope , $stateParams, $location, Authentication, Journey, Users, $filter, $http/*, $Modal, $log*/) {

        //MODAL
        $scope.items = ['item1', 'item2', 'item3'];

        $scope.animationsEnabled = true;

        $scope.open = function (size) {

            var modalInstance = $Modal.open({
                animation: $scope.animationsEnabled,
                templateUrl: 'MyModalContent.html',
                controller: 'ModalInstanceCtrl',
                size: size,
                resolve: {
                    items: function () {
                        return $scope.items;
                    }
                }
            });

            modalInstance.result.then(function (selectedItem) {
                $scope.selected = selectedItem;
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };

        $scope.toggleAnimation = function () {
            $scope.animationsEnabled = !$scope.animationsEnabled;
        };

        //MODAL

        $scope.journeyDate = {
            date : new Date(),
            departureTime : new Date(),
            arrivalTime : new Date()
        };

        $scope.create = function() {
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

            newJourney.journeyDate = {
                departureTime : $scope.journeyDate.departureTime,
                arrivalTime : $scope.journeyDate.arrivalTime
            };
            newJourney.availableSeats = $scope.availableSeats;
            newJourney.description = $scope.description;
            newJourney.suggestedTip = $scope.suggestedTip;

            newJourney.$save(function (response) {
                $location.path('/journeys/' + newJourney._id);
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

        // Find existing journey
        $scope.findOne = function() {
            $scope.journey = Journey.get({
                journeyId: $stateParams.journeyId
            });
        };

        // Remove existing Category
        $scope.removeJourney = function(journey) {
            if (journey) {
                    journey.$remove();

                    for (var i in $scope.journeys) {
                        if ($scope.journeys [i] === journey) {
                            $scope.journeys.splice(i, 1);
                        }
                    }
            } else {
                    $scope.journey.$remove(function () {
                        $location.path('journeys');
                    });
            }
        };

        // Update existing journey
        $scope.update = function() {
            var journey = $scope.journey;

            journey.$update(function() {
                $location.path('journeys/' + journey._id);
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

    }
]);

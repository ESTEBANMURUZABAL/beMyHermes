'use strict';

// Journey controller
angular.module('journey').controller('JourneyController', ['$scope', '$stateParams', '$location', 'Authentication', 'Journey', 'Users', '$filter', '$http',
	function($scope , $stateParams, $location, Authentication, Journey, Users, $filter, $http) {
        var vm = this;
        vm.journeyObject = {};
        vm.startMap = {
            latitude: '',
            longitude: ''
        };

        vm.endMap = {
            latitude: '',
            longitude: ''
        };

        // function to post journeys
        $scope.postJourney = function() {
            vm.postError = '';
            var newJourney = new Journey();
            newJourney.start = {};
            newJourney.end = {};


            //newJourney.travelDate.weekly = {
            //    mon: {
            //        departureTime: typeof Date,
            //        arrivalTime: typeof Date
            //    },
            //    tue: {
            //        departureTime: typeof Date,
            //        arrivalTime: typeof Date
            //    },
            //    wed: {
            //        departureTime: typeof Date,
            //        arrivalTime: typeof Date
            //    },
            //    thu: {
            //        departureTime: typeof Date,
            //        arrivalTime: typeof Date
            //    },
            //    fri: {
            //        departureTime: typeof Date,
            //        arrivalTime: typeof Date
            //    },
            //    sat: {
            //        departureTime: typeof Date,
            //        arrivalTime: typeof Date
            //    },
            //    sun: {
            //        departureTime: typeof Date,
            //        arrivalTime: typeof Date
            //    }
            //};

            newJourney.start.street = vm.startLocation;
            newJourney.start.lat =  vm.startMap.latitude;
            newJourney.start.lng =  vm.startMap.longitude;
            newJourney.start.area = vm.startArea;
            newJourney.start.city = vm.startCity;
            newJourney.start.address = vm.startAddress;

            newJourney.end.street = vm.endLocation;
            newJourney.end.lat =  vm.endMap.latitude;
            newJourney.end.lng =  vm.endMap.longitude;
            newJourney.end.area = vm.endArea;
            newJourney.end.city = vm.endCity;
            newJourney.end.address = vm.endAddress;

            //if (vm.journeyObject.isWeekly) {
            //
            //    newJourney.travelDate.weekly.mon.departureTime = vm.journeyObject.weekly.mon.departureTime;
            //    newJourney.travelDate.weekly.tue.departureTime = vm.journeyObject.weekly.tue.departureTime;
            //    newJourney.travelDate.weekly.wed.departureTime = vm.journeyObject.weekly.wed.departureTime;
            //    newJourney.travelDate.weekly.thu.departureTime = vm.journeyObject.weekly.thu.departureTime;
            //    newJourney.travelDate.weekly.fri.departureTime = vm.journeyObject.weekly.fri.departureTime;
            //    newJourney.travelDate.weekly.sat.departureTime = vm.journeyObject.weekly.sat.departureTime;
            //    newJourney.travelDate.weekly.sun.departureTime = vm.journeyObject.weekly.sun.departureTime;
            //    newJourney.travelDate.weekly.mon.arrivalTime = vm.journeyObject.weekly.mon.arrivalTime;
            //    newJourney.travelDate.weekly.tue.arrivalTime = vm.journeyObject.weekly.tue.arrivalTime;
            //    newJourney.travelDate.weekly.wed.arrivalTime = vm.journeyObject.weekly.wed.arrivalTime;
            //    newJourney.travelDate.weekly.thu.arrivalTime = vm.journeyObject.weekly.thu.arrivalTime;
            //    newJourney.travelDate.weekly.fri.arrivalTime = vm.journeyObject.weekly.fri.arrivalTime;
            //    newJourney.travelDate.weekly.sat.arrivalTime = vm.journeyObject.weekly.sat.arrivalTime;
            //    newJourney.travelDate.weekly.sun.arrivalTime = vm.journeyObject.weekly.sun.arrivalTime;
            //} else {
                newJourney.travelDate.isDayOnly = true;
                newJourney.travelDate.dayOnly.departureTime = vm.journeyObject.dayOnly.departureTime;
                newJourney.travelDate.dayOnly.arrivalTime = vm.journeyObject.dayOnly.arrivalTime;
            //}
            newJourney.availableSeats = vm.journeyObject.availableSeats;
            newJourney.description = vm.journeyObject.description;
            newJourney.suggestedTip = vm.journeyObject.suggestedTip;

            newJourney.$save(vm.journeyObject, function(tweet) {
                console.log(tweet);
                if (!tweet.departure) {
                    vm.postError = 'Please fill all fields correctly!';
                } else {
                    $location.path('journeys/' + response._id);
                }
            }, function(err) {
                console.log(err);
                vm.postError = 'Error in posting';
            });
        };

        vm.fetchStartAddress = function() {
            var address = vm.startAddressModel.replace(' ', '%20');
            $http.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + address).then(function(response) {
                if ((response.data !== undefined) && (response.data.status = 'OK') && (response.data.results !== undefined) && (response.data.results[0].geometry !== undefined) && (response.data.results[0].address_components !== undefined)) {
                    vm.startMap.latitude = response.data.results[0].geometry.location.lat;
                    vm.startMap.longitude = response.data.results[0].geometry.location.lng;
                    vm.startLocation = response.data.results[0].formatted_address.split(',')[0];
                    vm.startArea = response.data.results[0].formatted_address.split(',')[1];
                    var len = response.data.results[0].formatted_address.split(',').length;
                    vm.startCity = response.data.results[0].formatted_address.split(',')[len - 3];
                    vm.startAddress = response.data.results[0].formatted_address;
                }
            });
        };

        vm.fetchEndAddress = function() {
            var address = vm.endAddressModel.replace(' ', '%20');
            $http.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + address).then(function(response) {
                if ((response.data !== undefined) && (response.data.status === 'OK') && (response.data.results !== undefined) && (response.data.results[0].geometry !== undefined) && (response.data.results[0].address_components !== undefined)) {
                    vm.endMap.latitude = response.data.results[0].geometry.location.lat;
                    vm.endMap.longitude = response.data.results[0].geometry.location.lng;
                    vm.endLocation = response.data.results[0].formatted_address.split(',')[0];
                    vm.endArea = response.data.results[0].formatted_address.split(',')[1];
                    var len = response.data.results[0].formatted_address.split(',').length;
                    vm.endCity = response.data.results[0].formatted_address.split(',')[len - 3];
                    vm.endAddress = response.data.results[0].formatted_address;
                }
            });
        };
	}
]);



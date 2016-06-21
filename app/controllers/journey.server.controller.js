'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Journey = mongoose.model('Journey'),
    errorHandler = require('./errors.server.controller'),
    _ = require('lodash');

    /**
     * Show the current journey
     */
    exports.read = function(req, res) {
        Journey.findById(req.params.journeyId).exec(function(err, journey) {
            if (err) {
                return res.status(400).send({
                    message: errorHandler.getErrorMessage(err)
                });
            } else {
                if (!journey) {
                    return res.status(404).send({
                        message: 'Journey not found'
                    });
                }
                res.json(journey);
            }
        });
    };

    /**
     * Create a journey
     */
    exports.create = function(req, res) {
        var newJourney = new Journey();

        newJourney.startStreet = req.body.startStreet;
        newJourney.startCoordLat = req.body.startCoordLat;
        newJourney.startCoordLng = req.body.startCoordLng;
        newJourney.startArea = req.body.startArea;
        newJourney.startCity = req.body.startCity;
        newJourney.startAddress = req.body.startAddress;

        newJourney.endStreet = req.body.endStreet;
        newJourney.endCoordLat = req.body.endCoordLat;
        newJourney.endCoordLng = req.body.endCoordLng;
        newJourney.endArea = req.body.endArea;
        newJourney.endCity = req.body.endCity;
        newJourney.endAddress = req.body.endAddress;

        if(req.body.isDayOnly) {
            newJourney.dayJourney = {
                departureDate : req.body.dayJourney.departureDate,
                arrivalDate : req.body.dayJourney.arrivalDate
            };
        } else {
            angular.forEach(req.body.weeklyJourney, function(value) {
                if(value.selected){
                    newJourney.weeklyJourney = {
                        value: {
                            departureDate: req.body.weeklyJourney.value.departureDate,
                            arrivalDate: req.body.weeklyJourney.value.arrivalDate
                        }
                    }
                }
            });
        }

        newJourney.isDayOnly = req.body.isDayOnly;
        newJourney.availableSeats = req.body.availableSeats;
        newJourney.description = req.body.description;
        newJourney.suggestedTip = req.body.suggestedTip;
        newJourney.posted_by = req.user._id;

        newJourney.save(function(err) {
            if (err) {
                return res.status(400).send({
                    message: errorHandler.getErrorMessage(err)
                });
            } else {
                res.status(201).json(newJourney);
            }
        });
    };

    /**
     * List of journeys
     */
    exports.list = function(req, res) {
        Journey.find().exec(function(err, journeys) {
            if (err) {
                return res.status(400).send({
                    message: errorHandler.getErrorMessage(err)
                });
            } else {
                res.json(journeys);
            }

            /**
     * journey middleware
     */
    exports.journeyByID = function(req, res, next, id) {

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send({
                message: 'Journey is invalid'
            });
        }

        Journey.findById(id).exec(function(err, journey) {
            if (err) return next(err);
            if (!journey) {
                return res.status(404).send({
                    message: 'Journey not found'
                });
            }
            req.journey = journey;
            next();
        });
    };});
    };


'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Journey = mongoose.model('Journey'),
    User = mongoose.model('User'),
    errorHandler = require('./errors.server.controller'),
    _ = require('lodash');

/**
 * Show the current journey
 */
exports.read = function(req, res) {
    res.json(req.journey);
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
    newJourney.journeyDate = {
        departureTime : req.body.journeyDate.departureTime,
        arrivalTime : req.body.journeyDate.arrivalTime
    };
    newJourney.isDayOnly = req.body.isDayOnly;
    newJourney.availableSeats = req.body.availableSeats;
    newJourney.description = req.body.description;
    newJourney.suggestedTip = req.body.suggestedTip;
    newJourney.posted_by = req.user._id;

    newJourney.save(function(err, newJourney) {
        if (err || !newJourney) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            User.findOne({
                _id: req.user._id
            }, function(err, user) {
                if (err) {
                    return res.send({
                        error: err
                    });
                }

                console.log(user);
                user.journeys.push(newJourney._id);
                user.save(function (err, user) {
                    if (err || !user) {
                        return res.send({
                            error: err
                        });
                    }
                    res.status(201).json(newJourney);
                });
            });
        }
    });
};



/*
req.user.journeys.push(newJourney._id);
req.user.save(function (err, user) {
    if (err || !user) {
        return res.send({
            error: err
        });
    }
    res.status(201).json(newJourney);
});
*/


/*

journey.save(function(err, journey) {
    if (err || !journey) {
        return res.send({
            error: err
        });
    } else {
        User.findOne({
            _id: req.params.uid
        }, function(err, user) {
            if (err) {
                return res.send({
                    error: err
                });
            }
            user.journeys.push(req.params.id);
            user.save(function(err, user) {
                if (err || !user) {
                    return res.send({
                        error: err
                    });
                }
                var notification = "Your request has been accepted";
                notify(res, req, req.params.uid, req.params.id, notification);
                return res.send(journey);
            });
        });
    }
});
*/

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
    });
};

exports.update = function(req, res) {
    var journey = req.journey;

    journey = _.extend(journey, req.body);

    journey.save(function(err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(journey);
        }
    });
};

exports.delete = function(req, res) {
    var journey = req.journey;

    journey.remove(function(err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(journey);
        }
    });
};

 /**
 * journey middleware
 */
exports.getByID = function(req, res, next, id) {

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
};

exports.searchForDate = function(req, res, next) {
    angular.forEach(['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'], function(value) {
        if (req.query.departureDate) {
            Journey.find({
                'weeklyJourney.value.departureDate': req.query.departureDate
        }).exec(function(err, journeys) {
                if (err) return res.send(err);
                    res.json(journeys);
                });
        } else {
            Journey.find({
                'dayJourney.departureDate': req.query.departureDate
            }).exec(function(err, journeys) {
                if (err) return res.send(err);
                res.json(journeys);
            });
        }
    });
};













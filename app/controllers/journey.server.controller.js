'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    _ = require('lodash');




/* To add new journeys . */
exports.create = (function(req, res, next) {
    if (!req.body.availableSeats || req.body.availableSeats < 1) {
        return res.send({
            error: 'Seats must be minimum 1'
        });
    }
    var newJourney = new Journey();
    newJourney.start = {};
    newJourney.end = {};
    newJourney.start.street = req.body.startStreet;
    newJourney.start.area = req.body.startArea;
    newJourney.start.lng = req.body.startCoordLng;
    newJourney.start.lat = req.body.startCoordLat;
    newJourney.end.street = req.body.endStreet;
    newJourney.end.area = req.body.endArea;
    newJourney.departure = req.body.departure;
    newJourney.vehicle = req.body.vehicle;
    newJourney.availableSeats = req.body.availableSeats;
    newJourney.genderPreference = req.body.genderPreference;
    newJourney.description = req.body.description;
    newJourney.fare = req.body.fare;
    newJourney.posted_by = req.user._id;
    newJourney.save(function(err, journeyDetail) {
        if (err) {
            return res.send(err);
        }
        req.user.journeys.push(journeyDetail._id);
        req.user.save(function(err, user) {
            journeyDetail.populate('posted_by vehicle', function(err, journey) {
                if (err) {
                    return res.send({
                        error: err
                    });
                }
                io.emit('journey', journeyDetail);
                res.send(journeyDetail);
            });
        });
    });
});


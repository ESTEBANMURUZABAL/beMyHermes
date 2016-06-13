'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    journey = require('../models/journey.server.model'),
    _ = require('lodash');




/* To add new journeys . */
exports.postJourney = (function(req, res, next) {
    var newJourney = new journey();

    newJourney.start.street = req.body.startLocation;
    newJourney.start.lat =  req.body.startMap.latitude;
    newJourney.start.lng =  req.body.startMap.longitude;
    newJourney.start.area = req.body.startArea;
    newJourney.start.city = req.body.startCity;
    newJourney.start.address = req.body.startAddress;

    newJourney.end.street = req.body.endLocation;
    newJourney.end.lat =  req.body.endMap.latitude;
    newJourney.start.lng =  req.body.endMap.longitude;
    newJourney.end.area = req.body.endArea;
    newJourney.end.city = req.body.endCity;
    newJourney.end.address = req.body.endAddress;

    if (req.body.journeyObject.weekly) {
        newJourney.travelDate.isWeekly = true;
        newJourney.travelDate.weekly.mon.departureTime = req.body.journeyObject.weekly.mon.departureTime;
        newJourney.travelDate.weekly.tue.departureTime = req.body.journeyObject.weekly.tue.departureTime;
        newJourney.travelDate.weekly.wed.departureTime = req.body.journeyObject.weekly.wed.departureTime;
        newJourney.travelDate.weekly.thu.departureTime = req.body.journeyObject.weekly.thu.departureTime;
        newJourney.travelDate.weekly.fri.departureTime = req.body.journeyObject.weekly.fri.departureTime;
        newJourney.travelDate.weekly.sat.departureTime = req.body.journeyObject.weekly.sat.departureTime;
        newJourney.travelDate.weekly.sun.departureTime = req.body.journeyObject.weekly.sun.departureTime;
        newJourney.travelDate.weekly.mon.arrivalTime = req.body.journeyObject.weekly.mon.arrivalTime;
        newJourney.travelDate.weekly.tue.arrivalTime = req.body.journeyObject.weekly.tue.arrivalTime;
        newJourney.travelDate.weekly.wed.arrivalTime = req.body.journeyObject.weekly.wed.arrivalTime;
        newJourney.travelDate.weekly.thu.arrivalTime = req.body.journeyObject.weekly.thu.arrivalTime;
        newJourney.travelDate.weekly.fri.arrivalTime = req.body.journeyObject.weekly.fri.arrivalTime;
        newJourney.travelDate.weekly.sat.arrivalTime = req.body.journeyObject.weekly.sat.arrivalTime;
        newJourney.travelDate.weekly.sun.arrivalTime = req.body.journeyObject.weekly.sun.arrivalTime;
    } else {
        newJourney.travelDate.isDayOnly = true;
        newJourney.travelDate.dayOnly.departureTime = req.body.journeyObject.dayOnly.departureTime;
        newJourney.travelDate.dayOnly.arrivalTime = req.body.journeyObject.dayOnly.arrivalTime;
    }
    newJourney.availableSeats = req.body.journeyObject.availableSeats;
    newJourney.description = req.body.journeyObject.description;
    newJourney.suggestedTip = req.body.journeyObject.suggestedTip;
    newJourney.posted_by = req.user._id;




    newJourney.save(function(err, journeyDetail) {
        if (err) {
            return res.send(err);
        }
        req.user.journeys.push(journeyDetail._id);
        req.user.save(function(err, user) {
            journeyDetail.populate(function(err) {
                if (err) {
                    return res.send({
                        error: err
                    });
                }
                res.send(journeyDetail);
            });
        });
    });
});


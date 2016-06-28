'use strict';

module.exports = function(app) {
	var journey = require('../../app/controllers/journey.server.controller');

    app.route('/journeys')
        .get(journey.list);

    app.route('/journeys')
        .post(journey.create);

    app.route('/journeys/:journeyId')
        .get(journey.journeyByID);

    app.route('/journeys')
        .get(journey.searchForDate);

    // Finish by binding the article middleware
    app.param('journeyId', journey.journeyByID);
};

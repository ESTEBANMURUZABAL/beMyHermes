'use strict';

module.exports = function(app) {
	var journey = require('../../app/controllers/journey.server.controller');

    app.route('/journeys')
        .get(journey.list);

    app.route('/journeys')
        .post(journey.create);


};


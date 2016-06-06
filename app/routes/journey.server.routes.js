'use strict';

module.exports = function(app) {
	var journey = require('../../app/controllers/journey.server.controller');

    app.route('/routes/add-route').post(journey.create);
};


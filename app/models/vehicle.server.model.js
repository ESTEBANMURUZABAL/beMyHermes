'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Vehicle Schema
 */
var VehicleSchema = new Schema({
	// Vehicle model fields   
	// ...
});

mongoose.model('Vehicle', VehicleSchema);
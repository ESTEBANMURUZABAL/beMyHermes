'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * City Schema
 */
var CitySchema = new Schema({
	// City model fields   
	// ...
});

mongoose.model('City', CitySchema);
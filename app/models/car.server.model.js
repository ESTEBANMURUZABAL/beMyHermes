'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Car Schema
 */
var CarSchema = new Schema({
	// Car model fields   
	// ...
});

mongoose.model('Car', CarSchema);
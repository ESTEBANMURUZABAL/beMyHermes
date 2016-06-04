'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    _ = require('lodash');


var crud = require('./crud.server.controller')('Notification', 'name');

module.exports = crud;

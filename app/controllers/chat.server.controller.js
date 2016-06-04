'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    _ = require('lodash');


var crud = require('./crud.server.controller')('Chat', 'name');

module.exports = crud;

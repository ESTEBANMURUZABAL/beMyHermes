/**
 * Created by Pratyush on 29-03-2016.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var JourneySchema = new Schema({

    posted_by: {
        type: String,
        required: true,
        ref: 'User'
    },
    startStreet: {
        type: String,
        required: true
    },
    startCoordLat: {
        type: String,
        required: true
    },
    startCoordLng: {
        type: String,
        required: true
    },
    startCity: {
        type: String,
        required: true
    },
    startAddress: {
        type: String,
        required: true
    },
    endStreet: {
        type: String,
        required: true
    },
    endCoordLat: {
        type: String,
        required: true
    },
    endCoordLng: {
        type: String,
        required: true
    },
    endArea: {
        type: String,
        required: true
    },
    endCity: {
        type: String,
        required: true
    },
    endAddress: {
        type: String,
        required: true
    },
    journeyDate : {
        departureTime : {
            type: Date
        },
        arrivalTime: {
            type: Date
        }
    },
	availableSeats: {
        type: String,
        required: true
    },
	description: {
        type: String
    },
    suggestedTip: {
        type: String,
        required: true
    },
	requested_by: [{
		id:
		{
			type: String,
			required: true,
			ref: 'User'
		},
		seatsRequired: {
            type: Number,
            required: true
        },
		created_at: {
            type: Date,
            default: Date.now()
        }
	}],
	accepted_requests: [{
		id: {
			type: String,
			required: true,
			ref: 'User'
		},
		seatsRequired: {
			type: Number,
			required: true
		},
		created_at: {
			type: Date
		}
	}],
	created_at: {type: Date, default: Date.now()}
});

module.exports = mongoose.model('Journey', JourneySchema);



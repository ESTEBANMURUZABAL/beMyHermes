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
    weeklyJourney: {
        monday : {
            departureDate : {
                type: Date
            },
            arrivalDate: {
                type: Date
            }
        },
        tuesday : {
            departureDate : {
                type: Date
            },
            arrivalDate: {
                type: Date
            }
        },
        wednesday : {
            departureDate : {
                type: Date
            },
            arrivalDate: {
                type: Date
            }
        },
        thursday : {
            departureDate : {
                type: Date
            },
            arrivalDate: {
                type: Date
            }
        },
        friday : {
            departureDate : {
                type: Date
            },
            arrivalDate: {
                type: Date
            }
        },
        saturday : {
            departureDate : {
                type: Date
            },
             arrivalDate: {
                 type: Date
            }
        },
        sunday : {
            departureDate : {
                type: Date
            },
            arrivalDate: {
                type: Date
            }
        }
    },
    dayJourney : {
        departureDate : {
            type: Date
        },
        arrivalDate: {
            type: Date
        }
    },
    isDayOnly: {
        type: Boolean,
        required: true
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



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
	start: {
		street: {
            type: String,
            required: true
        },
		area: {
            type: String,
            required: true
        },
		lat: {
            type: String,
            required: true
        },
		lng: {
            type: String,
            required: true
        },
		city: {
            type: Schema.ObjectId,
            required: true,
            ref: 'City'
        },
        address: {
            type: String,
            required: true
        }
	},
	end: {
		street: {
            type: String,
            required: true
        },
		area: {
            type: String,
            required: true
        },
        lat: {
            type: String,
            required: true
        },
        lng: {
            type: String,
            required: true
        },
		city: {
            type: Schema.ObjectId,
            required: true,
            ref: 'City'
        },
        address: {
            type: String,
            required: true
        }
	},
	travelDate: {
        weekly: {
            mon: {
                departureTime: {
                    type: Date
                },
                arrivalTime: {
                    type: Date
                }
            },
            tue: {
                departureTime: {
                    type: Date
                },
                arrivalTime: {
                    type: Date
                }
            },
            wed: {
                departureTime: {
                    type: Date
                },
                arrivalTime: {
                    type: Date
                }
            },
            thu: {
                departureTime: {
                    type: Date
                },
                arrivalTime: {
                    type: Date
                }
            },
            fri: {
                departureTime: {
                    type: Date
                },
                arrivalTime: {
                    type: Date
                }
            },
            sat: {
                departureTime: {
                    type: Date
                },
                arrivalTime: {
                    type: Date
                }
            },
            sun: {
                departureTime: {
                    type: Date
                },
                arrivalTime: {
                    type: Date
                }
            }
        },
        dayOnly: {
            departureTime: {
                type: Date
            },
            arrivalTime: {
                type: Date
            }
        },
        isWeekly: {
            type: Boolean,
            required: true
        },
        isDayOnly: {
            type: Boolean,
            required: true
        }
    },
	availableSeats: {
        type: Number,
        required: true
    },
	description: {
        type: String
    },
    suggestedTip: {
        type: Number,
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



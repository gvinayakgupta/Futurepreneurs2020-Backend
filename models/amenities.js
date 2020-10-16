const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const amenitiesSchema = new Schema({
    teamCode: String,
    premium: {
        amenities: [{
            name: String,
            cost: Number
        }],
        marketing: {
            name: String,
            cost: Number
        },
        number: Number,
        reason: String,
        cpr: Number
    },
    standard: {
        amenities: [{
            name: String,
            cost: Number
        }],
        marketing: {
            name: String,
            cost: Number
        },
        number: Number,
        reason: String,
        cpr: Number
    },
    totalCost: String
}, {
    timestamps: true
});

const Amenities = mongoose.model('amenity', amenitiesSchema);

module.exports = Amenities;
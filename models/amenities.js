const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const amenitiesSchema = new Schema({
    teamCode: String,
    premium: {
        amenities: [{
            title: String,
            cost: Number
        }],
        marketing: {
            title: String,
            cost: Number
        },
        number: Number,
        reason: String,
        cpr: Number
    },
    standard: {
        amenities: [{
            title: String,
            cost: Number
        }],
        marketing: {
            title: String,
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
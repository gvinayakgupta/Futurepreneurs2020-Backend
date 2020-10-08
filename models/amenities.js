const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const amenitiesSchema = new Schema({
    teamCode: String,
    pre: [{
        name: String,
        cost: Number
    }],
    eco: [{
        name: String,
        cost: Number
    }],
    preM: {
        name: String,
        cost: Number
    },
    ecoM: {
        name: String,
        cost: Number
    },
    preRoom : Number,
    ecoRoom: Number,
    Preason: String,
    Ereason: String,
    totalCost: String
}, {
    timestamps: true
});

const Amenities = mongoose.model('amenity', amenitiesSchema);

module.exports = Amenities;
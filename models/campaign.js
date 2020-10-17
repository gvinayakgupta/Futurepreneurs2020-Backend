const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const campaignSchema = new Schema({
    teamCode: String,
    description: String,
    imageUrl: String
}, {
    timestamps: true
});

const Campaign = mongoose.model('campaign', campaignSchema);

module.exports = Campaign; 
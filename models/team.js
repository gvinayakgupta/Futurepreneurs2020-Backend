const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teamSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    code: String,
    adminPass: String,
    specPass: String,
    amenSub: Boolean,
    camSub: Boolean
}, {
    timestamps: true
});

const Team = mongoose.model('team', teamSchema);
module.exports = Team; 
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const autoIncrement = require('mongoose-auto-increment');
require('dotenv').config();

// connection = mongoose.createConnection(process.env.dbURL);
// autoIncrement.initialize(connection);

const teamSchema = new Schema({
    name: String,
    // members: [{
    //     name: {
    //         type: String
    //     },
    //     email: {
    //         type: String
    //     }
    // }],
    password: String,
    email: String,
}, {
    timestamps: true
});

// teamSchema.plugin(autoIncrement.plugin, {
//     model: 'Team',
//     field: 'teamId',
//     startAt: 1,
//     incrementBy: 1
// });

const Team = mongoose.model('team', teamSchema);

module.exports = Team;
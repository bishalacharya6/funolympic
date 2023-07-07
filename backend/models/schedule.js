const mongoose = require('mongoose');
const { Schema } = mongoose;

const scheduleSchema = new Schema({
    sport: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    teamA: {
        type: String,
        required: true
    },
    teamB: {
        type: String,
        required: true
    }
});

const Schedule = mongoose.model('Schedule', scheduleSchema);
module.exports = Schedule;

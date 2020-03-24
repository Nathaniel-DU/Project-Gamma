const mongoose = require(`mongoose`);

const Schema = mongoose.Schema;

const LocationSchema = new Schema({
        
    dateStarted: {
        type: Date,
        default: Date.now
    },

    dateEnded: {
        type: Date
    },

    locations: []

});

const Location = mongoose.model('Location', LocationSchema);

module.exports = Location;

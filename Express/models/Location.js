import mongoose from `mongoose`;
const Schema = mongoose.Schema;

const LocationSchema = new Schema({
    eventStarted: {
        type: Date,
        default: Date.now,
    },
    eventEnded: Date,
    locations: [],
    lastUpdated: Date,
});

LocationSchema.methods.lastUpdatedDate = function() {
    this.lastUpdated = Date.now();
    return this.lastUpdated;
};

const Location = mongoose.model(`Location`, LocationSchema);
module.exports = Location;
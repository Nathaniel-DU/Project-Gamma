import mongoose from `mongoose`;
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName: {
        type: String,
        trim: true,
        required: true,
    },
    lastName: {
        type: String,
        trim: true,
        required: true,
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, `Please enter a valid e-mail address`],
    },
    profileImg: {
        type: String,
        trim: true,
        match: ["https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)", `Please use a valid URL`],
    },
    addressLineOne: {
        type: String,
        trim: true,
        required: true,
    },
    addressLineTwo: {
        type: String,
        trim: true,
        required: true,
    },
    zipcode: {
        type: String,
        trim: true,
        required: true,
        match: ["^[0-9]{5}(?:-[0-9]{4})?$",'Please enter a valid zipcode']
    },
    country: {
        type: String,
        trim: true,
        required: true,
    },
    city: {
        type: String,
        trim: true,
        required: true,
    },
    state: {
        type: String,
        trim: true,
    },
    userCreated: {
        type: Date,
        default: Date.now,
    },
    lastUpdated: Date,
});

UserSchema.methods.lastUpdatedDate = function() {
    this.lastUpdated = Date.now();
    return this.lastUPdated;
};

const User = mongoose.model(`User`, UserSchema);
module.exports = User;
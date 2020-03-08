const mongoose = require(`mongoose`);
const bcrypt = require(`bcryptjs`);

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, "Please enter a valid e-mail address"]
    },

    password: {
        type: String,
        trim: true,
        required: "Password is Required",
        validate: [
          function(input) {
            return input.length >= 6;
          },
          "Password needs to be longer."
        ]
    },

    tenant: {
        type: String,
        required: true,
    },

    client_id: {
        type: String,
        required: true,
    },

    connection: {
        type: String,
        required: true,
    },

    phoneNumber: {
        type: String,
        required: true
    },

    firstName: {
        type: String,
        required: true,
        trim: true,
    },

    lastName: {
        type: String,
        required: true,
        trim: true,
    },

    profileImage: {
        type: String,
    },

    addressLineOne: {
        type: String,
        trim: true,
        required: true,
    },
    addressLineTwo: {
        type: String,
        trim: true,
<<<<<<< HEAD
=======
        required: true,
>>>>>>> Added User model
    },
    zipcode: {
        type: String,
        trim: true,
        required: true,
<<<<<<< HEAD
        match: [/^[0-9]{5}(?:-[0-9]{4})?$/,'Please enter a valid zipcode']
=======
        match: ["^[0-9]{5}(?:-[0-9]{4})?$",'Please enter a valid zipcode']
>>>>>>> Added User model
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

    onEvent: {
        type: Boolean,
        required: true,
<<<<<<< HEAD
        default: false,
=======

>>>>>>> Added User model
    },

    dateCreated: {
        type: Date,
        default: Date.now
    },

    lastUpdated: {
        type: Date
    }
});

UserSchema.methods.lastUpdatedDate = function() {
    this.lastUpdated = Date.now();
    return this.lastUpdated;
}

UserSchema.pre(`save`, function(next) {
    if(!this.isModified(`password`)) return next();

    bcrypt.genSalt(12, (err, salt) => {
        if(err) return next(err);
        bcrypt.hash(this.password, salt, (err, hash) => {
            if(err) return next(err);
            this.password = hash;
            next();
        });
    });
});

UserSchema.methods.comparePassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

UserSchema.hashPassword = function(password){
<<<<<<< HEAD
    return bcrypt.hashSync(password);
=======
    return hashSync(password);
>>>>>>> Added User model
}

const User = mongoose.model('User', UserSchema);

module.exports = User;
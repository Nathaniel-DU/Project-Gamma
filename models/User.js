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
            return input.length >= 8;
          },
          "Password needs to be longer."
        ]
    },

    friendsList: [
        {
            type: Schema.Types.ObjectId,
            ref: "User",
        }
    ],

    friendsPending: [
        {
            type: Schema.Types.ObjectId,
            ref: "User",
        }
    ],

    friendsInvited: [
        {
            type: Schema.Types.ObjectId,
            ref: "User",
        }
    ],

    locations: [
        {
            type: Schema.Types.ObjectId,
            ref: "Location"
        }
    ],


    phoneNumber: {
        type: String,
        required: true,
        match: [/^([0-9]( |-)?)?(\(?[0-9]{3}\)?|[0-9]{3})( |-)?([0-9]{3}( |-)?[0-9]{4}|[a-zA-Z0-9]{7})$/, 'Please enter a valid phone number']
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

    onEvent: {
        type: Boolean,
        required: true,
        default: false,
    },

    dateCreated: {
        type: Date,
        default: Date.now
    },

});

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



const User = mongoose.model('User', UserSchema);

module.exports = User;
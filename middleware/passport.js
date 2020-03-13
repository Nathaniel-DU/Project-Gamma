const passport = require(`passport`);
const LocalStrategy = require(`passport-local`).Strategy;

const db = require(`../models`);

passport.use(new LocalStrategy(
    {
        usernameField: `email`
    },
    function(email, password, done) {
        db.User.findOne({
            email: email
        }).then((dbUser) => {
            if(!dbUser) {
                return done(null, false, {
                    message: `Incorrect email`
                });
            }
            else if (!dbUser.comparePassword(password)) {
                return done(null, false, {
                    message: `Incorrect password.`
                });
            }
            return done(null, dbUser);
        });
    }
));

passport.serializeUser(function(user, cb) {
    cb(null, user);
});

passport.deserializeUser(function(user, cb) {
    cb(null, user);
});

module.exports = passport;
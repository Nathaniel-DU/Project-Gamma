const authRouter = require(`express`).Router();
const db = require(`../../models`);
const passport = require(`../../middleware/passport`);
const randomstring = require(`randomstring`);
const sgMail = require(`@sendgrid/mail`);
sgMail.setApiKey(process.env.SENDGRID_API);

authRouter.route(`/signup`)
    .post((req, res, next) => {
        const user = {...req.body}
        db.User.create(user).then(() => {
            res.status(200).end();
        }).catch(err => {
            console.log(err);
            res.status(422).json(err.errors[0].message);
        });
});

authRouter.route(`/login`)
    .post(passport.authenticate(`local`, {
    failureRedirect: `/auth/loginFailed`,
}), (req, res, next) => {
    res.status(200).send();
});

authRouter.route(`/isauthenticated`)
    .get((req, res, next) => {
        if(req.user) {
            res.status(200).send(); 
        }else{
            res.status(401).send();
        }
    });

authRouter.route(`/logout`)
    .get((req, res, next) => {
        req.logout();
        res.status(200).send();
    });

authRouter.route(`/loginFailed`)
    .get((req, res, next) => {
        res.json(
            {
                message: "Incorrect username or password",
                status: 401
            });
    });

authRouter.route(`/reset`)
    .post((req, res, next) => {
        db.User.findOneAndUpdate({
            email: req.body.email
        }, {
            $set: {
                passwordResetLink:  randomstring.generate({
                    length: 50,
                    capitalization: 'lowercase'
                })
            },
        }, {
            new: true
        })
        .then(user => {
            if(user){
                sgMail.send({
                    to: user.email,
                    from: `info@bknutson.com`,
                    subject: `StaySafe Password Reset`,
                    text: `https://staysafeapp.herokuapp.com/auth/reset/${user.passwordResetLink}`,
                    html: `https://staysafeapp.herokuapp.com/auth/reset/${user.passwordResetLink}`
                });
                res.status(200).json({message: "If an account exists with this email, a password reset email has been sent"});
            }else{
                res.status(200).json({message: "If an account exists with this email, a password reset email has been sent"});
            }
        })
        .catch(err => {
            console.log(err);
            res.status(200).json({message: "If an account exists with this email, a password reset has been sent"});
        })
    });

authRouter.route(`/reset/:resetid`)
    .post((req, res, next) => {
        if(req.body.password === req.body.confirmPassword){
            if(req.body.password.length >= 8){
                db.User.findOneAndUpdate({
                    passwordResetLink: req.params.resetid
                }, {
                    $set: {
                        passwordResetLink: ''
                    }
                }, {
                    new: true
                })
                .then(user => {
                    if(user){
                        user.password = req.body.password;
                        user.save();
                        res.status(200).send();
                    }else{
                        res.status(404).send();
                    }
                })
                .catch(err => {
                    console.log(err);
                    res.status(404).send();
                })
            }else{
                res.json({
                    message: "Password must be at least 8 characters",
                    status: 422
                })
            }
        }else{
            res.json({
                message: "Passwords do not match",
                status: 422
            });
        }
    })
    .get((req, res, next) => {
        db.User.findOne({
            passwordResetLink: req.params.resetid
        })
        .then(user => {
            if(user){
                res.status(200).send();
            }else{
                res.status(404).send();
            }
        })
        .catch(err => {
            console.log(err);
            res.status(404).send();
        });
    });

module.exports = authRouter;


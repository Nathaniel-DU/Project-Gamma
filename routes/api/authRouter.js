const authRouter = require(`express`).Router();
const db = require(`../../models`);
const passport = require(`../../middleware/passport`);

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
    failureRedirect: `/auth/login`,
    failureFlash: `true`
}), (req, res, next) => {
    res.redirect(`/`);
});

authRouter.route(`/isauthenticated`)
    .get((req, res, next) => {
        if(req.user) {
            res.send(true); 
        }else{
            res.send(false);
        }
    });

authRouter.route(`/logout`)
    .get((req, res, next) => {
        req.logout();
        res.redirect(`/`);
    });



module.exports = authRouter;


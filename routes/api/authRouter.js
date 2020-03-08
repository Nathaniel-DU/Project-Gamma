const authRouter = require(`express`).Router();
const db = require(`../../models`);

authRouter.route(`/signup`)
    .post((req, res, next) => {
        const user = {
            ...req.body, 
            client_id: process.env.AUTH0_CLIENT_ID,
            connection: process.env.AUTH0_DBCONNECTION,
            tenant: process.env.AUTH0_TENANT};
        db.User.create(user).then(() => {
            res.status(200).end();
        }).catch(err => {
            console.log(err);
            res.status(422).json(err.errors[0].message);
        });
});

module.exports = authRouter;

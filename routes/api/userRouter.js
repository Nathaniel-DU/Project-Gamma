const userRouter = require(`express`).Router();
const db = require(`../../models`);
const friendRouter = require(`./friendRouter`);

userRouter.route(`/getuserid`)
    .get((req, res, next) => {
        if(req.user){
            res.json(req.user);
        }
        console.log(req.user);
    });

userRouter.use(`/:userid/friends`, friendRouter);

module.exports = userRouter;


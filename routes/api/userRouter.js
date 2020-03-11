const userRouter = require(`express`).Router();
const db = require(`../../models`);
const friendRouter = require(`./friendRouter`);

userRouter.use(`/:userid/friends`, friendRouter);

module.exports = userRouter;


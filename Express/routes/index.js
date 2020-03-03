const indexRouter = require(`express`).Router();

indexRouter.route(`/`)
    .get((req, res, next) => {
        console.log(`Hello`);
    });

module.exports = indexRouter;
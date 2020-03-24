const friendRouter = require(`express`).Router({mergeParams: true});
const sgMail = require(`@sendgrid/mail`);
const db = require(`../../models`);
sgMail.setApiKey(process.env.SENDGRID_API);

//Accept
friendRouter.route(`/accept/:friendid/confirmed`)
    .get((req, res, next) => {
        db.User.findByIdAndUpdate(req.params.userid, {
            $addToSet: {
                friendsList: req.params.friendid
            }
        })
        .then(() => {
            db.User.findByIdAndUpdate(req.params.userid, {
                $pull: {
                    friendsInvited: req.params.friendid
                }
            })
            .then(() => {
                db.User.findByIdAndUpdate(req.params.friendid, {
                    $addToSet: {
                        friendsList: req.params.userid
                    }
                })
                .then(() => {
                    db.User.findByIdAndUpdate(req.params.friendid, {
                        $pull: {
                            friendsPending: req.params.userid
                        }
                    })
                    .then(() => {
                        res.status(200).send();
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(404).send();
                    })
                })
                .catch(err => {
                    console.log(err);
                    res.status(404).send();
                })
            })
            .catch(err => {
                console.log(err);
                res.status(404).send();
            });
        })
        .catch(err => {
            console.log(err);
            res.status(404).send();
        });
    });

module.exports = friendRouter;

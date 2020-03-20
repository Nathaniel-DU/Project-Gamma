const friendRouter = require(`express`).Router({mergeParams: true});
const sgMail = require(`@sendgrid/mail`);
const db = require(`../../models`);
sgMail.setApiKey(process.env.SENDGRID_API);

//Invite
friendRouter.route(`/invite/:friendid`)
    .get((req, res, next) => {
        db.User.findByIdAndUpdate(req.params.userid, {
            $addToSet: {
                friendsPending: req.params.friendid
            }
        })
        .then(invitee => {
            if(invitee){
                db.User.findByIdAndUpdate(req.params.friendid, {
                    $addToSet: {
                        friendsInvited: req.params.userid
                    }
                })
                .then(invited => {
                    if(invited){
                        sgMail.send({
                            to: invited.email,
                            from: `info@bknutson.com`,
                            subject: `${invitee.firstName} ${invitee.lastName} has invited you as a friend on StaySafe`,
                            text: `Click this link to accept the friend request https://staysafeapp.herokuapp.com/user/${invited._id}/friends/accept/${invitee._id}`,
                            html: `Click this link to accept the friend request https://staysafeapp.herokuapp.com/user/${invited._id}/friends/accept/${invitee._id}`
                        });
                    }
                })
                .catch(err => console.log(err))
            }
        })
        .catch(err => console.log(err))
    })




//Accept
friendRouter.route(`/accept/:friendid`)
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
            })
        })
        .catch(err => {
            console.log(err);
            res.status(404).send();
        })
    });

module.exports = friendRouter;
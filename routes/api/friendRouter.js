const friendRouter = require(`express`).Router({mergeParams: true});
const sgMail = require(`@sendgrid/mail`);
const db = require(`../../models`);
sgMail.setApiKey(process.env.SENDGRID_API);

//Invite
friendRouter.route(`/invite/:friendid`)
    .get((req, res, next) => {
        db.User.findByIdAndUpdate(req.params.userid, {
            $push: {
                friendsPending: req.params.friendid
            }
        })
        .then(invitee => {
            if(invitee){
                db.User.findByIdAndUpdate(req.params.friendid, {
                    $push: {
                        friendsInvited: req.params.userid
                    }
                })
                .then(invited => {
                    if(invited){
                        sgMail.send({
                            to: invited.email,
                            from: `info@bknutson.com`,
                            subject: `This is a test`,
                            text: `localhost:3001/user/${invited._id}/friends/accept/${invitee._id}`,
                            html: `localhost:3001/user/${invited._id}/friends/accept/${invitee._id}`
                        });
                    }
                })
                .catch(err => console.log(err))
            }
        })
        .catch(err => console.log(err))
    })


//Remove

//Accept
friendRouter.route(`/accept/:friendid`)
    .get((req, res, next) => {
        db.User.findByIdAndUpdate(req.params.userid, {
            $push: {
                friendsList: req.params.friendid
            },
            $pullAll: {
                friendsInvited: [req.params.userid]
            }
        })
        .then(() => {
            db.User.findByIdAndUpdate(req.params.friendid, {
                $push: {
                    friendsList: req.params.userid
                },
                $pullAll: {
                    friendsPending: [req.params.friendid]
                }
            })
            .catch(err => console.log(err))
        })
        .catch(err => console.log(err));
    });

module.exports = friendRouter;
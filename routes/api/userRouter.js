const userRouter = require(`express`).Router();
const db = require(`../../models`);
const friendRouter = require(`./friendRouter`);
const axios = require(`axios`);
const sgMail = require(`@sendgrid/mail`);
sgMail.setApiKey(process.env.SENDGRID_API);

userRouter.route(`/friends`)
    .get((req, res, next) => {
        let finalFriendsList = [];
        if(req.user){
            req.user.friendsList.forEach(friendid => {
                db.User.findById(friendid)
                    .then(friendObj => {
                        let friend = {};
                        friend.name = `${friendObj.firstName} ${friendObj.lastName}`;
                        if(friendObj.onEvent){
                            db.Location.findById(friendObj.locations[friendObj.locations.length - 1])
                                .then(locationList => {
                                    friend.location = locationList.locations[locationList.locations.length - 1];
                                    finalFriendsList.push(friend);
                                    if(finalFriendsList.length === req.user.friendsList.length){
                                        res.json(finalFriendsList);
                                    }
                                })
                                .catch(err => {
                                    console.log(err);
                                    res.status(404).send();
                                });
                        }else{
                            finalFriendsList.push(friend);
                            if(finalFriendsList.length === req.user.friendsList.length){
                                res.status(200).json(finalFriendsList);
                            }
                        }
                    })
                    .catch(err => {
                        console.log(err);
                        res.send(404).send();
                    })
            });

        }
    });

userRouter.route('/friendinvite')
    .post((req, res, next) => {
        if(req.user) {
            db.User.findOne({'email': req.body.email})
                .then(user => {
                    if(user) {
                        db.User.findByIdAndUpdate(req.user._id, {
                            $push: {
                                friendsPending: user._id
                            }
                        })
                        .then(invitee => {
                            if(invitee){
                                db.User.findByIdAndUpdate(user._id, {
                                    $push: {
                                        friendsInvited: req.user._id
                                    }
                                })
                                .then(invited => {
                                    if(invited){
                                        sgMail.send({
                                            to: invited.email,
                                            from: `info@bknutson.com`,
                                            subject: `${invitee.firstName} ${invitee.lastName} has invited you to StaySafe`,
                                            text: `Click this link to accept the friend request http://staysafeapp.herokuapp.com/user/${invited._id}/friends/accept/${invitee._id}`,
                                            html: `Click this link to accept the friend request http://staysafeapp.herokuapp.com/user/${invited._id}/friends/accept/${invitee._id}`
                                        });
                                    }
                                })
                                .catch(err => console.log(err))
                            }
                        })
                        .catch(err => console.log(err))
                        res.json('Invite Sent!');
                    } else {
                        res.json('User not found');
                    }
                }); 
        }
    });



userRouter.use(`/:userid/friends`, friendRouter);

module.exports = userRouter;


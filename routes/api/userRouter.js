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
            db.User.findById(req.user._id)
                .then(user => {
                    if(user.friendsList.length > 0){
                        user.friendsList.forEach(friendid => {
                            db.User.findById(friendid)
                                .then(friendObj => {
                                    let friend = {};
                                    friend.name = `${friendObj.firstName} ${friendObj.lastName}`;
                                    friend.userId = friendObj._id;
                                    if(friendObj.onEvent){
                                        db.Location.findById(friendObj.locations[friendObj.locations.length - 1])
                                            .then(locationList => {
                                                const locationStr = locationList.locations[locationList.locations.length -1];
                                                axios({
                                                    "method": "GET",
                                                    "url": "https://google-maps-geocoding.p.rapidapi.com/geocode/json",
                                                    "headers":{
                                                        "content-type":"application/octet-stream",
                                                        "x-rapidapi-host":"google-maps-geocoding.p.rapidapi.com",
                                                        "x-rapidapi-key": process.env.REVERSE_GEOCODING_API_KEY
                                                    }, "params": {
                                                        "language": "en",
                                                        "latlng": locationStr
                                                    }
                                                }).then((response) => {
                                                    friend.location = response.data.results[0].formatted_address;
                                                    finalFriendsList.push(friend);
                                                    if(finalFriendsList.length === req.user.friendsList.length){
                                                        res.status(200).json(finalFriendsList);
                                                    }
                                                }).catch((err) => {
                                                    console.log(err)
                                                });
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
                    }else{
                        res.status(200).json(finalFriendsList);
                    }
                })
        }
    });

userRouter.route('/friendinvite')
    .post((req, res, next) => {
        if(req.user) {
            db.User.findOne({'email': req.body.email})
                .then(user => {
                    if(user) {
                        if(!user.friendsList.includes(req.user._id) && !user.friendsInvited.includes(req.user._id)){
                            db.User.findByIdAndUpdate(req.user._id, {
                                $addToSet: {
                                    friendsPending: user._id
                                }
                            })
                            .then(invitee => {
                                if(invitee){
                                    db.User.findByIdAndUpdate(user._id, {
                                        $addToSet: {
                                            friendsInvited: req.user._id
                                        }
                                    })
                                    .then(invited => {
                                        if(invited){
                                            sgMail.send({
                                                to: invited.email,
                                                from: `info@bknutson.com`,
                                                subject: `${invitee.firstName} ${invitee.lastName} has invited you to StaySafe`,
                                                text: `Click this link to accept the friend request https://staysafeapp.herokuapp.com/user/${invited._id}/friends/accept/${invitee._id}`,
                                                html: `Click this link to accept the friend request https://staysafeapp.herokuapp.com/user/${invited._id}/friends/accept/${invitee._id}`
                                            });
                                            res.status(200).send();
                                        }
                                    })
                                    .catch(err => console.log(err))
                                }
                            })
                            .catch(err => console.log(err))
                            res.json('Invite Sent!');
                        }else{
                            res.json('Friend already invited');
                        }
                    } else {
                        res.json('User not found');
                    }
                }); 
        }
    });

    //Remove
userRouter.route(`/remove/:friendid`)
    .get((req, res, next) => {
        db.User.findByIdAndUpdate(req.user._id, {
            $pull: {
                friendsList: req.params.friendid
            }
        })
        .then(() => {
            db.User.findByIdAndUpdate(req.params.friendid, {
                $pull: {
                    friendsList: req.user._id
                }
            })
            .then(() => {
                res.status(200).send();
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

userRouter.route(`/profile`)
    .get((req, res, next) => {
        db.User.findById(req.user._id)
            .then(user => {
                if(user){
                    res.json({firstName: user.firstName, lastName: user.lastName, email: user.email, phoneNumber: user.phoneNumber})
                }else{
                    res.status(404).send();
                }
            });
    })
    .put((req, res, next) => {
        db.User.findByIdAndUpdate(req.user._id, {
            $set: {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                phoneNumber: req.body.phoneNumber
            }
        })
            .then(user => {
                if(user){
                    res.status(200).send();
                }else{
                    res.status(404).send();
                }
            });
    });
userRouter.use(`/:userid/friends`, friendRouter);

module.exports = userRouter;

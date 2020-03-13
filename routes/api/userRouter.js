const userRouter = require(`express`).Router();
const db = require(`../../models`);
const friendRouter = require(`./friendRouter`);

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
                                    console.log(locationList);
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

userRouter.use(`/:userid/friends`, friendRouter);

module.exports = userRouter;


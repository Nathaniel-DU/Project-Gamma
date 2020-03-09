const twilio = require(`twilio`);
const client = new twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);
const eventRouter = require(`express`).Router();
const db = require(`../../models`);

//Start
eventRouter.route(`/start/:userid`)
    .put((req, res, next) => {
        db.User.findByIdAndUpdate(req.params.userid,
            {
                $set: {
                    onEvent: true
                }
            })
            .then()
            .catch(err => {
                console.log(err)
                res.status(404).send();
            });
    });

//Excuse
eventRouter.route(`/excuse/:userid`)
    .get((req, res, next) => {
        db.User.findById(req.params.userid)
            .then(user => {
                if(user){
                    client.messages.create({
                        body: `${user.firstName} ${user.lastName} needs an excuse! Please, call to say the house is on fire!`,
                        to: user.phoneNumber,
                        from: `+17205134524`
                    })
                    .then(message => {
                        console.log(message.sid);
                        res.status(200).send();
                    })
                    .catch(err => console.log(err));
                }
            })
    });

// emergency services
eventRouter.route(`/emergency/:userid`)
    .get(( req, res, next) => {
        db.User.findById(req.params.userid)
            .then(user => {
                if(user){
                    client.messages.create({
                        body: "This is an emergency",
                        to: user.phoneNumber,
                        from: `+17205134524`
                    })
                    .then(() => {
                        res.status(200).send();
                    })
                    .catch(err => console.log(err));
                }
                res.status(404).send();
            })
            .catch(err => {
                console.log(err);
                res.status(404).send();
            });
    });

// request ride

// update location

//Stop
eventRouter.route(`/stop/:userid`)
    .put((req, res, next) => {
        db.User.findByIdAndUpdate(req.params.userid,
            {
                $set: {
                    onEvent: false
                }
            })
            .then((message) => console.log(message.sid))
            .catch(err => console.log(err));
    });




module.exports = eventRouter;
const { User } = require("../models");

const { userService } = require("../services");

exports.authorize = (req, res) => {

    let user = new User(req.body);

    userService.authorize(user)
        .then(onfulfilled => {

            let { hash, bind, ...content} = onfulfilled;

            res.status(200).json({ result: { status: true, tx: hash, description: `Successfully submitted message bound to ${bind}` }, timestamp: new Date() });
        })
        .catch(onrejected => {

            let { hash, bind, ...content} = onrejected;

            res.status(400).json({ result: { status: false, tx: hash, description: `Failed to submit message bound to ${bind}` }, timestamp: new Date() });
        })
}
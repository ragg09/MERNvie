const { json } = require('stream/consumers');
let User = require('../models/user.model');


//index
exports.index = async (req, res) => {
    await User.find()
        .sort( { createdAt: -1} )
        .then(user => res.json(user))
        .catch(err => res.status(4000).json('Error:' + err));
}

//create
exports.create =  async (req, res) => {
    const fullname = req.body.name;
    const email = req.body.email;
    const image = req.body.imageUrl;
    const role = "";

    const newUser = new User({
        fullname,
        email,
        image,
        role,
    });

    await newUser.save()
        .then(user => res.json(newUser))
        .catch(err => res.status(4000).json('Error:' + err));
    //console.log(`${image}`);
}
//import jwt from 'jsonwebtoken'
const jwt_decode = require('jwt-decode');
let User = require('../models/user.model');

exports.CheckAuth = async (req, res, next) => {
    //getting access token from req
    const token = req.headers.authorization;
    const decodeData = jwt_decode(token);
    //console.log(`${decodeData.email}`);
    const email = decodeData.email;
    const findUser = await User.find({email});

    
   
    //console.log(`${findUser[0].role}`);
    // if(findUser[0].role === ""){
    //     //res.redirect('/');
    // }

    if(decodeData.email === "laravelmovie@gmail.com")
    {
        //next();
    }
}

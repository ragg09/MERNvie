const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    fullname: {
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: "The email is already taken",
    },
    image:{
        type: String,
        required: true,
    },
    role:{
        type: String,
    }
},{
    timestamps: true
});

const User = mongoose.model('user', userSchema); //name of table from db + the newly declared schema

module.exports = User;
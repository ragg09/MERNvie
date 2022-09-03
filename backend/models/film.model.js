const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const filmSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    plot:{
        type: String,
        required: true,
    },
    genre:{
        type: String,
        required: true,
    },
    gross:{
        type: Number,
        required: true,
    },
    date_released:{
        type: Date,
        required: true,
    },
    runtime:{
        type: Number,
        required: true,
    },
    rating:{
        type: String,
        required: false,
    },
    images: [
        {
          public_id: {
            type: String,
            required: false,
          },
    
          url: {
            type: String,
            required: false,
          },
        },
    ],
    actors: [
        {
            user:{
                type : mongoose.Schema.ObjectId,
                ref : 'Actor',
                required : true
            },
            name: {
                type: String,
                required: true,
            },
            image: {
                type: String,
                required: false,
            }
        }
    ],
    producers: [
        {
            user : {
                type : mongoose.Schema.ObjectId,
                ref : 'Producer'
            },
            name : {
                type: String,
                required: true,
            },
            image: {
                type: String,
                required: false,
            }
        }
    ],
    reviews: [
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: 'User',
                required: true
            },
            name: {
                type: String,
                required: true
            },
            rating: {
                type: Number,
                required: true
            },
            comment: {
                type: String,
                required: true
            },
            image: {
                type: String,
                required: false,
            },
            timestamp: { type: Date, default: Date.now},
        }
    ],
},{
    timestamps: true
});

const Film = mongoose.model('film', filmSchema); //name of table from db + the newly declared schema

module.exports = Film;
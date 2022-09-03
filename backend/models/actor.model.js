const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const actorSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    bio:{
        type: String,
        required: true,
    },
    images: [
        {
          public_id: {
            type: String,
            required: true,
          },
    
          url: {
            type: String,
            required: true,
          },
        },
    ],
    rating:{
        type: String,
        required: false,
    },
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

const Actor = mongoose.model('actor', actorSchema); //name of table from db + the newly declared schema

module.exports = Actor;
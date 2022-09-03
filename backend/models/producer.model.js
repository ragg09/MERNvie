const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const producerSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    website:{
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
},{
    timestamps: true
});

const Producer = mongoose.model('producer', producerSchema); //name of table from db + the newly declared schema

module.exports = Producer;
const express = require('express');
const cors = require('cors');
const cloudinary = require('cloudinary');
const fileUpload = require('express-fileupload');
const mongoose = require('mongoose');


//to use  .env
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

//middleware || express
app.use(cors());
app.use(express.json());
app.use(fileUpload());

//cloduinary config
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET 
});

//routes 
require('./routes/route')(app);

//mongodb connection
const uri = process.env.ATLAS_URI
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});
const connection = mongoose.connection;
connection.once('open', ()=>{
    console.log("Connected to Mongodb atlas");
})

app.listen(port, ()=> {
    console.log(`PORT: ${port}`);
})
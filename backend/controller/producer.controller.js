//model
let Producer = require('../models/producer.model');
const cloudinary = require("cloudinary");

//index
exports.index = async (req, res) => {
    await Producer.find()
        .sort( { createdAt: -1} )
        .then(producer => res.json(producer))
        .catch(err => res.status(4000).json('Error:' + err));
}

//show via id
exports.show = async (req, res) => {
    await Producer.findById(req.params.id)
        .then(producer => res.json(producer))
        .catch(err => res.status(4000).json('Error:' + err));
}

//create
exports.create = async (req, res) => {

    // console.log(req.body);

    let images = [];
    let imagesLinks = [];

    if (typeof req.body.images === "string") {
        console.log("string to");
        images.push(req.body.images);
      } else {
        images = req.body.images;
      }

    for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.v2.uploader.upload(images[i], {
          folder: "producer",
        });
  
        imagesLinks.push({
          public_id: result.public_id,
          url: result.secure_url,
        });
    }

    // console.log(imagesLinks);

    const name = req.body.name;
    const email = req.body.email;
    const website = req.body.website;
    // const images = imagesLinks;

    const newProducer = new Producer({
        name,
        email,
        website,
        images : imagesLinks,
    });

    await newProducer.save()
        .then(producer => res.json(newProducer))
        .catch(err => res.status(4000).json('Error:' + err));
}

//update
exports.update = async (req, res) => {
    if(req.body.images){
        let images = [];
        let imagesLinks = [];
    
        if (typeof req.body.images === "string") {
            console.log("string to");
            images.push(req.body.images);
          } else {
            images = req.body.images;
          }
    
        for (let i = 0; i < images.length; i++) {
            const result = await cloudinary.v2.uploader.upload(images[i], {
              folder: "producer",
            });
      
            imagesLinks.push({
              public_id: result.public_id,
              url: result.secure_url,
            });
        }

        await Producer.findById((req.params.id))
            .then(producer =>{
                producer.name = req.body.name;
                producer.email = req.body.email;
                producer.website = req.body.website;
                producer.images =  imagesLinks,
                producer.save()
                    .then(() => res.json(producer))
                    .catch(err => res.status(4000).json('Error:' + err));
            })
            .catch(err => res.status(4000).json('Error:' + err));
    }else{
        await Producer.findById((req.params.id))
            .then(producer =>{
                producer.name = req.body.name;
                producer.email = req.body.email;
                producer.website = req.body.website;

                producer.save()
                    .then(() => res.json(producer))
                    .catch(err => res.status(4000).json('Error:' + err));
            })
            .catch(err => res.status(4000).json('Error:' + err));
    }
}

//delete
exports.delete = async (req, res) => {
    await Producer.findByIdAndDelete(req.params.id)
        .then(producer => res.json('Record Deleted!'))
        .catch(err => res.status(4000).json('Error:' + err));
}
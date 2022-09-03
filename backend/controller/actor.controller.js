//model
let Actor = require('../models/actor.model');
const cloudinary = require("cloudinary");


//index
exports.index = async (req, res) => {
    await Actor.find()
        .sort( { createdAt: -1} )
        .then(actor => res.json(actor))
        .catch(err => res.status(4000).json('Error:' + err));
}


//show via id
exports.show = async (req, res) => {
    await Actor.findById(req.params.id)
        .then(actor => res.json(actor))
        .catch(err => res.status(4000).json('Error:' + err));
}

//create
exports.create = async (req, res) => {
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
          folder: "actor",
        });
  
        imagesLinks.push({
          public_id: result.public_id,
          url: result.secure_url,
        });
    }

    const name = req.body.name;
    const bio = req.body.bio;

    const newActor = new Actor({
        name,
        bio,
        images : imagesLinks,
    });

    await newActor.save()
        .then(actor => res.json(newActor))
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

        await Actor.findById((req.params.id))
        .then(actor =>{
            actor.name = req.body.name;
            actor.bio = req.body.bio;
            actor.images =  imagesLinks,
            actor.save()
                .then(() => res.json(actor))
                .catch(err => res.status(4000).json('Error:' + err));
        })
        .catch(err => res.status(4000).json('Error:' + err));
    }else if(req.body.reviews){
      var ratingCount = 0;
      var ratingSum = 0;

      //getting figures to compute ratings
      JSON.parse(req.body.reviews).forEach((rate) => {
          ratingCount++; 
          ratingSum += parseInt(rate.rating);
      });

      const rating = ratingSum / ratingCount;
      //console.log(rating);
      //console.log(ratingSum);
      //console.log(ratingCount);


      //console.log(JSON.parse(req.body.reviews));

      await Actor.findById((req.params.id))
      .then(actor =>{
          actor.rating = rating;
          actor.reviews = JSON.parse(req.body.reviews);
          actor.save()
              .then(() => res.json(actor))
              .catch(err => console.log(err));
      })
      .catch(err => console.log(err));

  }else{
        await Actor.findById((req.params.id))
            .then(actor =>{
                actor.name = req.body.name;
                actor.bio = req.body.bio;
                actor.save()
                    .then(() => res.json(actor))
                    .catch(err => res.status(4000).json('Error:' + err));
            })
            .catch(err => res.status(4000).json('Error:' + err));
    }
}

//delete
exports.delete = async (req, res) => {
    await Actor.findByIdAndDelete(req.params.id)
        .then(actor => res.json('Record Deleted!'))
        .catch(err => res.status(400).json('Error:' + err));
}
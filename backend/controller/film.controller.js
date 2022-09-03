//model
let Film = require('../models/film.model');
let Actor = require('../models/actor.model');
const cloudinary = require("cloudinary");

//index
exports.index = async (req, res) => {
    await Film.find()
        .sort( { createdAt: -1} )
        .then(film => res.json(film))
        .catch(err => res.status(4000).json('Error:' + err));
}

//show via id
exports.show = async (req, res) => {
    await Film.findById(req.params.id)
        .then(film => res.json(film))
        .catch(err => res.status(4000).json('Error:' + err));
}

//create
exports.create = async (req, res) => {
    //console.log(req.body);
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
          folder: "film",
        });
  
        imagesLinks.push({
          public_id: result.public_id,
          url: result.secure_url,
        });
    }

    const title = req.body.title;
    const plot = req.body.plot;
    const genre = req.body.genre;
    const gross = req.body.gross;
    const date_released = req.body.date_released;
    const runtime = req.body.runtime;
    const actors = JSON.parse(req.body.actors);
    const producers = JSON.parse(req.body.producers);


    const newFilm = new Film({
        title,
        plot,
        genre,
        gross,
        date_released,
        runtime,
        images : imagesLinks,
        actors,
        producers,
    });

    await newFilm.save()
        .then(film => {
          res.json(newFilm)
        })
        .catch(err => console.log(err));

    // console.log(newFilmid);
    // console.log(imagesLinks[0].url);
    // console.log(newFilmtitle);

    // actors.forEach(actor =>{
    //   //console.log(actor);
    //   //user in this instance is ID
    //   const myActor = Actor.findById(actor.user)
    //   console.log(json(myActor));
    // })
    
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

        await Film.findById((req.params.id))
        .then(film =>{
            film.title = req.body.title;
            film.plot = req.body.plot;
            film.genre = req.body.genre;
            film.date_released = req.body.date_released;
            film.runtime = req.body.runtime;
            film.images =  imagesLinks,
            film.save()
                .then(() => res.json(film))
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

        await Film.findById((req.params.id))
        .then(film =>{
            film.rating = rating;
            film.reviews = JSON.parse(req.body.reviews);
            film.save()
                .then(() => res.json(film))
                .catch(err => console.log(err));
        })
        .catch(err => console.log(err));

    }else{
        await Film.findById((req.params.id))
            .then(film =>{
                film.title = req.body.title;
                film.plot = req.body.plot;
                film.genre = req.body.genre;
                film.date_released = req.body.date_released;
                film.runtime = req.body.runtime;
                film.save()
                    .then(() => res.json(film))
                    .catch(err => console.log(err));
            })
            .catch(err => console.log(err));
    }
}

//delete
exports.delete = async (req, res) => {
    await Film.findByIdAndDelete(req.params.id)
        .then(film => res.json('Record Deleted!'))
        .catch(err => res.status(4000).json('Error:' + err));
}
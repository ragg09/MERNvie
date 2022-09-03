//model
let Actor = require('../models/actor.model');
let Producer = require('../models/producer.model');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');

// Get all movies => /api/v1/all/movies
exports.ActorProducer = catchAsyncErrors(async (req,res,next) => {
    const actor = await Actor.find();
    const producer = await Producer.find();

    res.status(200).json({
        actor,
        producer
    })
})
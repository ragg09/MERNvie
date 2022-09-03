module.exports = (app) =>{
    //middleware
    const CheckAuth = require('../middleware/Auth');
    
    //controllers
    const userController = require('../controller/user.controller');
    const producerController = require('../controller/producer.controller');
    const actorController = require('../controller/actor.controller');
    const filmController = require('../controller/film.controller');
    const mul = require('../controller/mul.controller');

    //google login create routes
    app.get('/user', userController.index);
    app.post('/user', userController.create);

    //producer routes
    app.get('/producer', producerController.index);
    app.get('/producer/:id', producerController.show);
    app.post('/producer', producerController.create);
    app.post('/producer/:id', producerController.update);
    app.delete('/producer/:id', producerController.delete);

    //actor routes
    app.get('/actor', actorController.index);
    app.get('/actor/:id', actorController.show);
    app.post('/actor', actorController.create);
    app.post('/actor/:id', actorController.update);
    app.delete('/actor/:id', actorController.delete);

    //film routes 
    app.get('/film', filmController.index);
    app.get('/film/:id', filmController.show);
    app.post('/film', filmController.create);
    app.post('/film/:id', filmController.update);
    app.delete('/film/:id', filmController.delete);

    //extra
    app.get('/actor_producer', mul.ActorProducer);

}
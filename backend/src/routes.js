const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');

const NgoController = require('./controllers/NgoController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

// Sessions
routes.post('/sessions', SessionController.create);

// NGOs
routes.get('/ngos', NgoController.index);

routes.post('/ngos', celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    whatsapp: Joi.string(),
    city: Joi.string().required(),
    uf: Joi.string().required().length(2),
  })  
}), NgoController.create);


// Incidents
routes.get('/incidents', celebrate({
  [Segments.QUERY]: Joi.object().keys({
    page: Joi.number(),
  })
}), IncidentController.index);


routes.post('/incidents', IncidentController.create);

routes.delete('/incidents/:id', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.number().required(),
  })
}), IncidentController.delete);


// Profile
routes.get('/profile', celebrate({
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required(),  
  }).unknown()
}), ProfileController.index);

module.exports = routes;
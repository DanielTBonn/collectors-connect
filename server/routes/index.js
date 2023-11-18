const routes = require('express').Router();

const getImages = require('getImages');

routes.use('/getimages', getImages)

module.exports = routes;


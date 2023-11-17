const router = require('express').Router();
const {
    getImage,
} = require('../controllers/image-controller');

router.route('/getimage').get(getImage);

module.exports = getImages;
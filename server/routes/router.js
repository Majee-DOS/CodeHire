const controllers = require('../controllers/controllers.js');
const express = require('express');
const router = express.Router();

router.get('/', controllers.getEvents);
router.post('/', controllers.postEvents);

module.exports = router;

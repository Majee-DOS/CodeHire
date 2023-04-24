const controllers = require('../controllers/controllers.js');
const express = require('express');
const router = express.Router();

router.get('/', controllers.getJobs);
router.post('/', controllers.postJobs);

module.exports = router;

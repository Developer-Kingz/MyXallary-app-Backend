const express = require('express');
const {body} = require("express-validator");
const Application = require('../models/application')
const applicationController = require('../controllers/applicationController');
// const router = express.Router();
const {Router} = require('express');
const router = Router(); 

//GET Applications
router.get('/applications', applicationController.getApplications);

//POST Applications
router.post('/application', applicationController.postApplication);

module.exports = router;
 
const express = require('express');
const {body} = require("express-validator");
const Job = require('../models/job')
const jobController = require('../controllers/jobController');
// const router = express.Router();
const {Router} = require('express');
const router = Router(); 

//GET Applications
router.get('/jobs', jobController.getJobs);

//POST Applications
router.post('/job', jobController.postJob);

//individuak post
router.get('job/:jobId', jobController.getSingleJobs)

module.exports = router;
 
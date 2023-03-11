const express = require('express');
const {body} = require("express-validator");
const Job = require('../models/job')
const jobController = require('../controllers/jobController');
// const router = express.Router();
const {Router} = require('express');
const multer = require("multer");
const router = Router(); 

//GET JOBS
router.get('/jobs', jobController.getJobs);

//POST JOB
router.post('/job', jobController.postJob);

//individual post
router.get('job/:jobId', jobController.getSingleJobs)

module.exports = router;
 
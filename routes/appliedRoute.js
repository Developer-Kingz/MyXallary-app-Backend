const express = require('express');
const {Router} = require('express');
appliedController = require('../controllers/appliedController');
const router = Router(); 

//GET ALL APPLIED JOBS FOR A USER
router.get('/jobs/apply/:jobId', appliedController.getApplied);
router.post('/jobs/apply/:jobId', appliedController.createApplied);

module.exports = router;
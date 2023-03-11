 jobController = require('./jobController');
// const job = require('../models/job');
 const Job = require('../models/job');
 const User = require("../models/user");


 //CREATE APPLIED JOBS
 exports.createApplied = async (req, res) => {
  console.log('hello');

  //FINDING THE JOB IN THE JOB SCHEMA
  try {
    const jobId = req.params.jobId;
    const userId = req.user;
    console.log({userId,jobId})

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).send('No available Job');
    }

    //CHECK IF THE JOBID IS EXISTING WITH THE USERID
    if (job.jobsId.includes(userId)) {
      return res.status(400).send('Applied before');
    }

    //PUSHING THE USERID TO THE JOBID AND SAVE
    job.jobsId.push(userId);
    await job.save();

    let userJob = await Job.findOne({ userId });
    console.log({userJob})

    //IF USERID DOES NOT EXIST CREATE JOB
    if (!userJob) {
      userJob = await Job.create({ userId, jobsId: [] });
    }

    //IF USER HAS APPLIED FOR THE JOB BEFORE THROW A MSG
    if (userJob.jobsId.includes(jobId)) {
      return res.status(400).send('You have applied for this before');
    }

    //PUSHING THE JOBIS TO THE USERJOB
    userJob.jobsId.push(jobId);
    await userJob.save();

    return res.status(200).send('Applied job created');
  } catch (err) {
    console.log(err);
    return res.status(500).send('Server Error');
  }
}


 //GET NEW APPLIED JOBS
 exports.getApplied = async (req, res) => {
   const {user} = req
   const myAppliedJob = await Job.findOne({userId: user})
   if (!myAppliedJob) {
      return res.status(404).send('User did not apply for this job');
   }
   const jobAppliedId = myAppliedJob.jobsId
   const page = parseInt(req.query.page || 1,10)
   const limit = parseInt(req.query.limit || 10,10)
   const startIndex = (page - 1) * limit
   const endIndex = page * limit

   const job = await Job.find({_id: {$in: jobAppliedId}}).skip(startIndex).limit({limit})
   const totalJobs = await Job.countDocuments({_id: {$in: jobAppliedId}})
   const totalPages = Math.ceil(totalJobs/limit)

   return res.status(200).send('applied jobs gotten')
 }
const Job = require('../models/job');

exports.getJobs = (req, res, next) => {
    Job.find().then(jobs=>{
        res.status(200).json({message: 'Fetched jobs successfully', jobs: jobs});
    }).catch(err=>{
        // console.log(err);
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    })
}

exports.postJob = (req, res, next) => {
    const company = req.body.company;
    const level = req.body.level;
    const country = req.body.country;
    const salary = req.body.salary;
    const tags = req.body.tags;
    const date = req.body.date;
    //create application in database
    const job = new Job({
        company: company,
        level: level,
        country: country,
        salary: salary,
        tags: tags,
        date: Date.now(),
    });

    job.save().then(result=>{
        console.log(result);
        res.status(201).json({
            message: "job created successfully",
            job: result
        });
    }).catch(err=>{
        // console.log(err);
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
};

exports.getSingleJobs = (req, res, next) => {
        const jobId = req.params.jobId
        Job.findById(jobId)
        .then(job=>{
            if(!job){
                const error = new Error('Could not find job');
                error.statusCode = 404;
                throw error
            }
            res.status(200).json({message: 'job fetched', job: job})
        }).catch(err => {
            // console.log(err);
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
        })
}

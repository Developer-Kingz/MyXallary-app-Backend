const Application = require('../models/application');

exports.getApplications = (req, res, next) => {
    res.status(200).json({
        applications: [
            {
                _id: '1',
                company: 'ABC Company',
                level: 'Senior Level',
                country: 'United Arab Emirates',
                salary: 1000000,
                tags: ['figma', 'Sketch', 'Adobe XD', 'Illustrator', 'Photoshop', 'InVision'],
                date: 'Applies 3 days ago'
            }
        ]
    })
}

exports.postApplication = (req, res, next) => {
    const company = req.body.company;
    const level = req.body.level;
    const country = req.body.country;
    const salary = req.body.salary;
    const tags = req.body.tags;
    const date = req.body.date;
    //create application in database
    const application = new Application({
        company: company,
        level: level,
        country: country,
        salary: salary,
        tags: tags,
        date: Date.now(),
    });
    application.save().then(result=>{
        console.log(result);
        res.status(201).json({
            message: "application created successfully",
            application: result
        });
    }).catch(err=>{
        console.log(err);
    });
};

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const jobSchema = new Schema({
    company: {
        type: String,
        // required: true
    },
    imageUrl: {
        type: String,
        // required: true,
    },
    level: {
        type: String,
        //required: true,
    },
    country: {
        type: String,
        // required: true,
    },
    salary: {
        type: Number,
        // required: true,
    },
    tags: [ {
        type: String,
        // required: true,
    }
],
    date: {
         type: Date
    },
    jobsId: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Job"
        }
    ],
    userId: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ]
},
 {timestamps: true }
);

module.exports = mongoose.model('Job', jobSchema);
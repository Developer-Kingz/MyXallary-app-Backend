const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
   // fullName: {
   //  type: String,
   //  required: true,
   //  minLength: 3,
   //  maxLength: 30
   // },
   // phone: {
   //    type: Number,
   //    required: true,
   //    minlength: 10,
   //    maxLength: 11
   // },
   email: {
    type: String,
    unique: true,
    required: [true, 'please provide an email']
   },
   // birthday: {
   //    type: String,
   //    required: true
   // }, 
   // address: {
   //    type: String,
   //    required: true
   // },
   // gender: {
   //    type: String,
   // },
   // skills: {
   //    type: String,
   // },
   password: {
    type: String,
    required: [true, 'please provide a password'],
    minLength: 6
   },
}, {timestamps: true});

module.exports = mongoose.model('User', userSchema);
const express = require('express');
const {body} = require("express-validator");
const User = require("../models/user");
const authController = require('../controllers/authController')
// const router = express.Router();
const {Router} = require('express');
const router = Router(); 


router.post('/signup', [
    body('email').isEmail().withMessage('Please enter a valid email!')
    .custom((value, {req})=>{
       return User.findOne({email: value}).then(userDoc =>{
          if(userDoc){
            return Promise.reject('Email address already exists!') 
          }
       })
    })
    .normalizeEmail(),
    body('password').trim().isLength({min: 6})

], authController.postSignup);

router.post('/login', authController.postLogin);
router.post('/logout', authController.postLogout);

module.exports = router;


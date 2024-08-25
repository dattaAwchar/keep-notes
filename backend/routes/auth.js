const express = require("express")
const User = require('../models/User')
const router = express.Router()
const {body, validationResult} = require('express-validator')


// Create a user using: POST "/api/auth/" .Doesn't require Auth
router.post('/', [
    body('name', 'Enter a valid name').isLength({min: 3}),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password contains atleast 5 characters').isLength({min: 5})
], (req, res) => {
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({error: error.array()});
    }
    User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    }).then(user => res.json(user))
    .catch(err=>{console.log(err)
        res.json({error: "please enter a unique value for email", message:err.message})
    })
})

module.exports = router
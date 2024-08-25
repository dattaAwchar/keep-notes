const express = require("express")
const User = require('../models/User')
const router = express.Router()
const {body, validationResult} = require('express-validator')


// Create a user using: POST "/api/auth/createuser" . No login required
router.post('/createuser', [
    body('name', 'Enter a valid name').isLength({min: 3}),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password contains atleast 5 characters').isLength({min: 5})
], async (req, res) => {
    // If there are errors, return Bad request and the errors
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({error: error.array()});
    }

    // check whether the user with this email exists already
    try{
    let user = await User.findOne({email: req.body.email})
    // console.log(User);
    
    if(user){
        return res.status(400).json({error:"sorry, a user with this email already exists"})
    }
    user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    })
    res.json(user)
} catch(error){
    console.log(error.message)
    res.status(500).send("some error occured")
}
})

module.exports = router

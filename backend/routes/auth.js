const express = require("express")
const User = require('../models/User')
const router = express.Router()
const {body, validationResult} = require('express-validator')
const bcrypt = require('bcryptjs')
let jwt = require('jsonwebtoken')

const JWT_SECRET = 'dattaisagoodb$oy';

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

    const salt = await bcrypt.genSalt(10)
    const secPass = await bcrypt.hash(req.body.password, salt)

    // creating a new user
    user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass
    })

    const data = {
        user:{
            id: user.id
        }
    }
    const authToken = jwt.sign(data, JWT_SECRET);
    

    // res.json(user)
    res.json({authToken})

} catch(error){
    console.log(error.message)
    res.status(500).send("some error occured")
}
})

module.exports = router





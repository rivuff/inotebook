const express = require('express');
const User = require('../models/User')
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const { toBeInTheDocument } = require('@testing-library/jest-dom/dist/matchers');
const fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = "harryisagoodB$oy"

//create a user using: POST "/api/auth/createuser"
router.post('/createuser',[
    body('name').isLength({ min: 3 }),
    body('email').isEmail(),
    body('password').isLength({ min: 5 }),
], async (req,res) =>{

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {

    //check wheather user with this email already exist 
    let user =await User.findOne({email: req.body.email});
    if(user){
        return res.status(400).json({eroor: "Email already exist"})
    }

    const salt = await bcrypt.genSalt(10);

    const secPass = await bcrypt.hash(req.body.password,salt);

   user = await User.create({
        name: req.body.name,
        email:req.body.email,
        password: secPass,
      })
      
    const data = {
      user:{
        id: user.id
      }
    }

    const authToken = jwt.sign(data , JWT_SECRET);


    res.json(authToken)
    console.log(jwtData)

} catch (error) {
        console.log(error.message);
}

})


//authenticate a user using: POST "/api/auth/login"

router.post('/login',[
  body('email','enter a valid email').isEmail(),
  body('password','password can not be blank').exists(),
],async (req,res)=>{
  const error = validationResult(req);
  if(!error.isEmpty()){
    return res.status(400).json({ errors: errors.array() });
  }

  const {email,password} = req.body;
  try{
    let user =await User.findOne({email});
    if(!user){
      return res.status(400).json({error: "please try again with correct credentials"});
    }

    const passWordCompare =await bcrypt.compare(password, user.password);
    
    if(!passWordCompare){
      return res.status(400).json({error: "please try again with correct credentials"});
    }

    const data = {
      user:{
        id: user.id
      }
    }
    const authToken = jwt.sign(data , JWT_SECRET);

    res.json({authToken});

  }catch (arror){
    console.error(error.message);
    res.status(500).send("Internal server error")
  }

} )


// get loggedin user details using POST "/api/auth/getuser". login required 

router.post('/getuser', fetchuser ,async (req,res)=>{

  try{
    const userID = req.user.id;
    const user = await User.findById(userID).select("-password")
    res.send(user)
  }catch(error){
    console.error(error.message);
    res.status(500).send("Internal server error")
  }

})


module.exports = router
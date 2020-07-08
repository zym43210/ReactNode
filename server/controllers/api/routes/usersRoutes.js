
const express = require("express");
const UserRoutes = express.Router();

const Users = require("../../../models/users");
const {registerValidation}=require('../../../validation/validation');



UserRoutes.post("/register", async(req, res) => {

    const {error} = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    
    const emailExist=await Users.findOne({email:req.body.email});
    if(emailExist) return res.status(400).send('email already exists');
    
   
 
    const newUser = new Users({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
    try{
        
       const savedUser=await newUser.save();
       res.send(savedUser);

    }
    catch(err){
        res.status(400).send(err);
    }
    
});

module.exports = UserRoutes;
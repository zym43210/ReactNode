
const express = require("express");
const UserRoutes = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const properties = require("../../../config/properties")
const Users = require("../../../models/users");

const { registerValidation, loginValidation } = require('../../../validation/validation');



UserRoutes.post("/register", async (req, res) => {

    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const emailExist = await Users.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).send('email already exists');

   
    
    const newUser = new Users({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    });
    bcrypt.genSalt(10, (err, salt) => {

        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
    });

   
    try {

        const savedUser = await newUser.save();
        res.send(savedUser);

    }
    catch (err) {
        res.status(400).send(err);
    }

});


UserRoutes.post("/login", async (req, res) => {
const {error}= loginValidation(req.body);
if (error) return res.status(400).send(error.details[0].message);
    const user = await Users.findOne({email:req.body.email});
    if(!user) return res.status(400).send('Email or password is wrong');

    bcrypt.compare(req.body.password, user.password).then(isMatch => {
        if (!isMatch) {
            return res.status(400).send('Invalid password')
        }
        const token = jwt.sign({_id:user._id},properties.TOKEN_KEY);
        res.header('auth-token',token).send(token);
        
    });

});

module.exports = UserRoutes;
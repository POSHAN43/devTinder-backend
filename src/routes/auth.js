const express = require("express");;
const authRouter = express.Router();
const { validateSignUpData } = require("../utils/validation"); //import validation function to validate the request body
const bcrypt = require('bcryptjs'); //import bcrypt library to encrypt the password
const jwt = require('jsonwebtoken'); //import jsonwebtoken library to create the token
const User = require("../models/user");



authRouter.post("/signup", async (req, res) => {
    try {
        //Validate the request body
        validateSignUpData(req); //validateSignUpData is a function which is used to validate the request body
    } catch (err) {
        return res.status(400).send("" + err);
    }
    //Encrypt the password
    const { firstName, lastName, emailId, password, age, gender, } = req.body;
    const passwordHash = await bcrypt.hash(password, 10); //bcrypt.hash is used to hash the password

    const user = new User({
        firstName,
        lastName,
        emailId,
        age,
        gender,
        password: passwordHash,
    });    //create new instance of user model

    try {
        const savedUser = await user.save();   //save the user in database
        const token = await savedUser.getJWT(); //getJWT method is used to create the token

        //Add the token to cookies and send the response back to the user
        res.cookie("token", token, { expires: new Date(Date.now() + 1 * 3600000) }); // cookies expire after 1 hour
        res.json({ message: "user added successfuly", data: savedUser }); //send the response back to the user
    } catch (err) {
        res.status(500).send("Internal server error: " + err);
    }
})

authRouter.post("/login", async (req, res) => {
    try {
        const { emailId, password } = req.body;
        const user = await User.findOne({ emailId }); //findOne method is used to find the first user which match with emailId;
        if (!user) {
            return res.status(401).send("Invalid credentials");
        }
        // const isPasswordValid = await bcrypt.compare(password, user.password); //compare the password with hashed password
        const isPasswordValid = await user.validatePassword(password); //validatePassword method is used to compare the password with hashed password

        if (isPasswordValid) {
            //Create JWT token
            // const token = await jwt.sign({_id:user._id}, "DEV@TINDER#2025", {expiresIn: "12h"}); //sign method is used to create the token
            const token = await user.getJWT(); //getJWT method is used to create the token

            //Add the token to cookies and send the response back to the user
            res.cookie("token", token, { expires: new Date(Date.now() + 1 * 3600000) }); // cookies expire after 1 hour
            res.json({ message: "login successful", data: user });
            return
        }
        res.status(401).send("Invalid credentials");
        return

    } catch (err) {
        res.status(500).send("Internal server error " + err);
    }

})
authRouter.post("/logout", async (req, res) => {
    res.cookie("token", null, { expires: new Date(Date.now()) }); // cookies expire immediately
    res.send("logout successful");
})


module.exports = authRouter;
const express = require("express");
const profileRouter = express.Router();
const {userAuth} = require("../middlewares/auth"); //import userAuth middleware to authenticate the user 
const { validateEditProfileData } = require("../utils/validation");


//Get profile
profileRouter.get("/profile/view", userAuth, async (req, res) => {
    try{
        const user = req.user;
        res.send(user);
    }catch(err){
        res.status(500).send("Internal server error "+err);
    }
 })

 profileRouter.patch("/profile/edit", userAuth, async (req,res)=>{
    try{
        if(!validateEditProfileData(req)){
            throw new Error("Invalid edit profile data");
        }
    const currentUser = req.user;
    Object.keys(req.body).forEach((key)=>{currentUser[key] = req.body[key]});
    await currentUser.save();
    res.json({message: "Profile updated successfully", data:currentUser});
    }catch (err){
        res.status(400).send("Error: "+err.message);
        return;
    }
 })

 module.exports = profileRouter;
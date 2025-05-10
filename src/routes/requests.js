const express = require('express');
const requestRouter = express.Router();
const {userAuth} = require("../middlewares/auth"); //import userAuth middleware to authenticate the user 
const ConnectionRequestModel = require('../models/connectionRequest');
const User = require('../models/user');
const sendEmail = require("../utils/sendEmail")


requestRouter.post("/request/send/:status/:toUserId", userAuth, async (req, res) => {    
try{
    const fromUserId = req.user._id;
    const toUserId = req.params.toUserId;
    const status = req.params.status;
    const allowedStatus = ["ignored","interested"];
    if(!allowedStatus.includes(status)){
        return res.status(400).json({message:"Invalid status type: "+status})
    }
    const toUser = await User.findById(toUserId);
    if(!toUser){
        return res.status(400).json({message:"User not found"})
    }
    const connectionRequest = new ConnectionRequestModel({
        fromUserId,
        toUserId,
        status
    });
    //check if the connection request already exists
    const existingConnectionRequest = await ConnectionRequestModel.findOne({
        $or:[
            {fromUserId,toUserId},
            {fromUserId:toUserId,toUserId:fromUserId}
        ]
    })
    if(existingConnectionRequest)
    {
        return res.status(400).json({message:"Connection request already exists"});
    }
    const data = await connectionRequest.save();
    const emailRes = await sendEmail.run()

    return res.json({message:"Connection request send sucussfully",data})

}catch(err){
    return res.status(400).send("ERROR: "+err.message);
}
})

requestRouter.post("/request/review/:status/:requestId", userAuth, async (req,res)=>{
    try{
        const loggedInUser = req.user;
        const {status,requestId} = req.params;
        const allowedStatus = ["accepted","rejected"];
        if(!allowedStatus.includes(status)){
            return res.status(400).json({message:"Invalid status type: "+req.params.status});
        }

        const connectionRequest = await ConnectionRequestModel.findOne({
            _id:requestId,
            toUserId:loggedInUser._id,
            status:"interested"
        })
        if(!connectionRequest){
            return res.status(404).json({message:"Connection request not found"});
        }

        connectionRequest.status = status;
        const data =  await connectionRequest.save();
        res.json({message:"Connection request " + status + " successfully",data});
    }catch(err){
        return res.status(400).send("ERROR: "+err.message);
    }
})

module.exports = requestRouter;

const express = require('express');
const { userAuth } = require('../middlewares/auth');
const ConnectionRequestModel = require('../models/connectionRequest');
const User = require('../models/user');
const userRouter = express.Router();

userRouter.get("/user/requests/received", userAuth, async (req,res)=>{
    try{
        const loggedInUser = req.user;
        const connectionRequests = await ConnectionRequestModel.find({
            toUserId:loggedInUser._id,
            status:"interested"
        }).populate("fromUserId", ["firstName","lastName", "photoUrl","age","gender","about"]);

        res.json({message: "Data fetched successfully", data: connectionRequests});
    }catch(err){
        return res.status(400).send("ERROR: "+err.message);
    }
})

userRouter.get("/user/connections", userAuth, async (req,res)=>{
    try{
      const loggedInUser = req.user;
      const connectionRequests = await ConnectionRequestModel.find({
        $or:[
            {fromUserId:loggedInUser._id},
            {toUserId:loggedInUser._id}
        ],
        status:"accepted"
      }).populate("fromUserId", ["firstName","lastName","photoUrl","about","age","gender", "skills"]).populate("toUserId", ["firstName","lastName","photoUrl","about","age","gender", "skills"]);
      const data = connectionRequests.map((row)=>{
        if(row.fromUserId._id.toString() === loggedInUser._id.toString()){
        return row.toUserId;
        }
        return row.fromUserId;
      });
      res.json({message: "Data fetched successfully", data});
    }catch(err){
        return res.status(400).send("ERROR: "+err.message);
    }
})

userRouter.get("/feed",userAuth, async (req,res)=>{
    try{
      const loggedInUser = req.user;
      const page = parseInt(req.query.page) || 1;
      let limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        limit = limit > 50 ? 50 : limit; // limit the number of users to 100
    //   const connectionRequests = await ConnectionRequestModel.find({
    //     $or:[
    //         {fromUserId:loggedInUser._id},
    //         {toUserId:loggedInUser._id}
    //     ]
    //   }).select("fromUserId toUserId status").populate("fromUserId", "firstName").populate("toUserId","firstName");
     
      const connectionRequests = await ConnectionRequestModel.find({
        $or:[
            {fromUserId:loggedInUser._id},
            {toUserId:loggedInUser._id}
        ]
      }).select("fromUserId toUserId status")
      
      const hideUsersFromFeed = new Set();
      connectionRequests.forEach((req)=>{
        hideUsersFromFeed.add(req.fromUserId.toString());
        hideUsersFromFeed.add(req.toUserId.toString()); 
      })

      const users = await User.find({
        $and:[
        {_id:{$nin: Array.from(hideUsersFromFeed)}}, 
        {_id:{$ne:loggedInUser._id}}
        ]  
    }).select("firstName lastName about skills photoUrl age gender").skip(skip).limit(limit)

      res.json({message: "Data fetched successfully", data: users});
    }catch(err){
        return res.status(400).send("ERROR: "+err.message);
    }
})
module.exports = userRouter;
const mongoose = require('mongoose');

const connectionRequestSchema = new mongoose.Schema({
    fromUserId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User", // reference to the User model
        required:true
    },
    toUserId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User", // reference to the User model
        required:true
    },
    status:{
        type:String,
        required:true,
        enaum:{
            values:["ignored","interested","accepted","rejected"],
            message: `{VALUE} is incorrect styatus type`
        }
    }
},{
    Timestamps:true
})

connectionRequestSchema.index({fromUserId:1,toUserId:1},{unique:true});
// Create a compound index on fromUserId and toUserId to ensure uniqueness
connectionRequestSchema.pre("save",async function(next){ // call this function before saving the document
    // this keyword refers to the current document
    const connectionRequest = this;
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){    
        throw new Error("You cannot send connection request to yourself");
    }
    next()
})

const ConnectionRequestModel  = new mongoose.model("ConnectionRequest",connectionRequestSchema);
module.exports = ConnectionRequestModel;
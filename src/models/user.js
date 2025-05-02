const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken'); //import jsonwebtoken library to create the token
const bcrypt = require('bcryptjs'); //import bcrypt library to hash the password

const userSchema = mongoose.Schema(
    {
    firstName: {
        type:String,
        required: true
    },
    lastName:{
        type: String
    },
    emailId: {
        type: String,
        required: true, // email is required
        unique: true,// email should be unique
        lowercase: true,// email should be in lowercase
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error(value+" is not a valid email");
            }   
        }
    },
    password:{
        type: String,
        required: true, 
    },
    age:{
        type: Number
    },
    gender: {
        type: String,
        enum:{
            values: ["male","female","other"],
            message: `{VALUE} is not a valid gender type`
        }
        // validate(value) {
        // if(!['male','female','other'].includes(value))
        // {
        // throw new Error(value+" is not a valid gender");
        // }
        // }
    },
    photoUrl:{
        type: String
    },
    about:{
        type: String,
        default: "Hello, I am using DevTinder"
    },
    skills:{
        type: [String]
    },
},
{
    timestamps: true //createdAt and updatedAt
}
);  

userSchema.methods.getJWT = async function(){
    const user = this
    const token = await jwt.sign({_id: user._id}, "DEV@TINDER#2025", {expiresIn: "7 days"});
    return token;
}

userSchema.methods.validatePassword = async function(passwordInputByUser){
    const user = this
    const passwordHash = user.password;
    const isPasswordValid = await bcrypt.compare(passwordInputByUser, passwordHash);
    return isPasswordValid;
}

const User = mongoose.model("User", userSchema);
module.exports = User;
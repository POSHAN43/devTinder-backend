const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req,res,next)=>{
    //Read the token from cookies
    try{
    const {token} = req.cookies;
    if(!token){
        res.status(401).send("Token not found: Please login again");
        return;
    }
    const decodedObj = await jwt.verify(token, process.env.JWT_SECRET);
    const {_id} = decodedObj;
    const user = await User.findById(_id);
    if(!user){
        res.status(401).send("Unauthorized");
        return;
    }
    req.user = user
    next()
}catch(err){
    res.status(401).send("Unauthorized");
    return; 
}
}
module.exports = {userAuth}
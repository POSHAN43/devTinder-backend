const mongoose = require("mongoose");

//first approach to connect database
const connectDB = async ()=>{
    mongoose.connect("mongodb+srv://poshanak47:jlXPh2iTQMvAHm1L@techbuddy.wphdu.mongodb.net/devTinder?retryWrites=true&w=majority&appName=TechBuddy"); //mongoose.connect return promiss and tell wether connection is successfullly establised or not. care@resonate.store
}
// connectDB().then(()=>{
//     console.log("database connected");
// }).catch((err)=>{
//     console.log("err",err)
// })

//second approach
module.exports = connectDB;
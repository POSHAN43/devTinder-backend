const mongoose = require("mongoose");

//first approach to connect database
const connectDB = async ()=>{
   await mongoose.connect(process.env.DB_CONNECTION_SECRET); //mongoose.connect return promiss and tell wether connection is successfullly establised or not. care@resonate.store
}
// connectDB().then(()=>{
//     console.log("database connected");
// }).catch((err)=>{
//     console.log("err",err)
// })

//second approach
module.exports = connectDB;
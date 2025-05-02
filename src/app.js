const express = require('express');
// require("./config/database")
const connectDB = require("./config/database");
const app = express();  //create new express js application 
const cookieParser = require('cookie-parser'); //import cookie-parser library to parse the cookies
const cors = require('cors');

app.use(cors({
    origin: "http://localhost:5174", //allow requests from this origin
    credentials: true, //allow cookies to be sent with the request
}))
app.use(express.json()); //middleware to parse incoming request with JSON payloads
app.use(cookieParser()); //middleware to parse cookies from the request headers

const authRouter = require("./routes/auth"); //import auth router
const profileRouter = require("./routes/profile"); //import profile router
const requestRouter = require("./routes/requests"); //import request router
const userRouter = require('./routes/user');

app.use("/", authRouter); //use auth router for all requests
app.use("/", profileRouter); //use profile router for all requests
app.use("/", requestRouter); //use request router for all requests
app.use("/",userRouter); //use user router for all requests

connectDB().then(() => {
    console.log("database connected");
    app.listen(4000, () => {
        console.log("running port no. 4000")
    })
})
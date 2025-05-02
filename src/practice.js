const express = require('express');
const app = express();

// app.use((req,res)=>{
//     res.send("Hello from the server");
// })  //Request handler

app.use("/hello",(req,res)=>{ //It will match /hello, /hello/2, /hello/anything
    res.send("hello hello");
})  

app.use("/hello/2",(req,res)=>{
    res.send("hello world");
})  // It will always execute when route match with "/"

app.use("/test",(req,res)=>{
    res.send("test server");
})  //Request handler

// app.listen(3000,()=>{
//     console.log("Server is running on port 3000")
// })   //listen request from port 3000

app.use("/user", (req, res) => {   //It can handle any kind of route like GET, POSt, PUT etc....
    res.send("route handler 1")   //It we comment this one that time it receive the request and go inside the callback but due to not sending response nothing will execute.
})

app.use("/product",                //first argument "/product" is route
    (req,res,next)=>{                   //second argument is route handler.
        res.send("product route handler 1")   //send the response to the client, if we comment this line then request received but not sending any response later on time out
    next();
    res.send("product route handler 1 after next()")  
    },
    (req,res)=>{                    //Third argument is another route handler 
        res.send("product route handler 2")
    }
)

app.use("/route1",
    (req,res)=>{
        console.log("scenario 1 route handler");
        res.send("scenario 1 route handler");   //immediatly send response
    }
)

app.use("/route2",
    (req,res)=>{
        console.log("scenario 2 route handler");
        //without res.send server continuoulsy run and after some time give time out
    }
)

app.use("/route3",
    (req,res)=>{
        console.log("scenario 3 route handler 1");
        res.send("scenario 3 route handler 1");   //immediatly send response
    },
    (req,res)=>{
        console.log("scenario 3 route handler");  //Not execute becoz in first route handler response already sent
    }
)

app.use("/route4",
    (req,res)=>{
        console.log("scenario 4 route handler 1");
        res.send("scenario 4 route handler 1");   //immediatly send response
    },
    (req,res)=>{
        console.log("scenario 4 route handler 2");
        res.send("scenario 4 route handler 2");  //Not execute becoz in first route handler response already sent
    }
)

app.use("/route5",
    (req,res, next)=>{
        console.log("scenario 5 route handler 1");
        res.send("scenario 5 route handler 1");   //immediatly send response
        next()  //immedietly go to next route handler but will get error becoz resonse already sent
    },
    (req,res)=>{
        console.log("scenario 5 route handler 2");
        res.send("scenario 5 route handler 2");  // will get error "Cannot set headers after they are sent to the client"
    }
)

app.use("/route6",
    (req,res,next)=>{
        console.log("scenario 6 route handler 1");
        next(); //go to the next route handler
    },
    (req,res)=>{
        console.log("scenario 6 route handler 2");
        res.send("scenario 6 route handler 2");  
    }
)

app.use("/route7",
    (req,res,next)=>{
        console.log("scenario 7 route handler 1");  
        next(); //go to the next route handler
        res.send("scenario 7 route handler 1"); //execute after second route handler complete execution and will get error becoz response already sent by second route handler
    },
    (req,res)=>{
        console.log("scenario 7 route handler 2");
        res.send("scenario 7 route handler 2");  //Not execute becoz in first route handler response already sent
    }
)

app.use("/route8",
    (req,res,next)=>{
        console.log("scenario 8 route handler 1");
        next(); //go to the next route 2 handler
    },
    (req,res,next)=>{
        console.log("scenario 8 route handler 2");
       next();  //go to next route 3
    },
    (req,res,next)=>{
        console.log("scenario 8 route handler 3");
        next(); //go to next rout due to unavailability of route it give cannot get route
    }
)

app.use("/route8",
    (req,res,next)=>{
        console.log("scenario 8 route handler 1");
        next(); //go to the next route 2 handler
    },
    (req,res,next)=>{
        console.log("scenario 8 route handler 2");
       next();  //go to next route 3
    },
    (req,res,next)=>{
        console.log("scenario 8 route handler 3");
        next(); //go to next rout due to unavailability of route it give cannot get route
    }
)

app.use("/route9",
    (req,res,next)=>{
        console.log("scenario 9 route handler 1");
        next(); //go to the next route 2 handler
    },
    (req,res,next)=>{
        console.log("scenario 9 route handler 2");
       next();  //go to next route 3
    },
    (req,res,next)=>{
        console.log("scenario 9 route handler 3");
        res.send("scenario 9 route handler 3");
    }
)

app.use("/route10",
    [(req,res,next)=>{
        console.log("scenario 10 route handler 1");
        next(); //go to the next route 2 handler
    },
    (req,res,next)=>{
        console.log("scenario 10 route handler 2");
       next();  //go to next route 3
    },
    (req,res,next)=>{
        console.log("scenario 10 route handler 3");
        res.send("scenario 10 route handler 3");
    }]                   //wrap with array and work as similer 
)

const routeH1 =  (req,res,next)=>{
    console.log("scenario 11 route handler 1");
    next(); //go to the next route 2 handler
}
const routeH2 =  (req,res,next)=>{
    console.log("scenario 11 route handler 2");
    res.send("scenario 11 route handler 2");
}
app.use("/route11", [routeH1, routeH2])

  


app.listen(4000, () => {
    console.log("server runing on port 4000")
})
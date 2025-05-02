- Create a repository
- Initialize the repo
- node_module, package.json, package.lock.json
- Install express
- Create a server
- Listen to port 3000
- Write request handler
- Install nodemon and update script inside package.json
- Different between caret and tilda (^ vs ~)

- Initialize git
- .gitignore
- Create a remote repo on github
- push all code to remote origin
- Write logic to handle GET, POSt, PATCH, DELETE, API call and test in postman.
- Explore routing and use of ?, +, (), * in the routes.
- use of regex in routes /a/ , /.*fly$/

- Multiple route handler
- next()
- next function and errors along with res.send();
- app.use("/route", rh1,rh2,rh3)

- What is middleware? why do we need it?
- How express js handle request behind the scene
- Different b/w app.use and app.all
- Write a dummy auth middleware for all user routes, except /user/login
- Error handling using app.use("/,(err,req,res,next)=>{})

- Create a free cluster on mongoDB website
- Install mongoose library.
- Connect your application to the Database.
- call the database function and connect to database before listing to server
- Create a userSchema & user model
- Create POST/signup API to add data to database
- Push some documents using API calls from postman
- Error handling using try catch

- JS object and JSON difference
- Add the express.json middleware
- Make your signup API dynamic
- API Get user by email
- API feed/ Get all the users from database
- API Get user by Id
- API Delete user by Id
- Difference b/w PUT and PATCH method


- Explore schematype options from the document
- add required, unique, lowercase, min,max trim
- Add default
- create a custom validate function
- Improve the DB schema - PUT all appropiate validation
- Add timestamps to the userSchema

- Validate data in signup API
- Install decrypt package
- Create password hash using decrypt.hash
- Create login POST API

- install cookies-parser
- Send dummy cookie to user
- Get/ profile API implement
- install jsonwebtoken
- Create JWT token in login API after password validation
- Use the cookie token to authenticate inside profile API
- Implement auth middleware and validate JWT cookies and perform next() operation to call API
- Set the expiry time of JWT token and cookies.
- Create userSchema method to getJWT()
- Create userSchema method to validate jwt token




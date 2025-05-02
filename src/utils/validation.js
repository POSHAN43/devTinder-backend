const validator = require('validator');

const validateSignUpData = (req)=>{
    const {firstName, lastName, emailId, password} = req.body
    if(!firstName || !lastName){
        throw new Error("first name and last name are required");
    }
    else if(firstName.length<4 || lastName.length<4){
        throw new Error("first name and last name should be at least 4 characters long")
    }
    else if(!validator.isEmail(emailId)){
        throw new Error("email is not valid")
    }else if(!validator.isStrongPassword(password)){
        throw new Error("password is not strong")
    }
}

const validateEditProfileData = (req)=>{
    const allowEditFields = [
        "firstName",
        "lastName",
        "emailId",
        "photoUrl",
        "gender",
        "age",
        "about",
        "skills"
    ]

    const isEditAllowed = Object.keys(req.body).every((key)=>allowEditFields.includes(key));
  
    return isEditAllowed;
}
module.exports = {validateSignUpData,validateEditProfileData}
const express =require('express');
const bcrypt=require('bcrypt');
const saltRounds=10;
const {validateSignup}=require("../utils/validateSignup.js");
const User = require("../config/models/user.js");
const authRouter=express.Router();

authRouter.post("/signup",async (req,res)=>{
    // Validate
try{
   validateSignup(req);

const {firstName,lastName,email,age,password,phone}=req.body;
    // encrypt password
    const hashedPassword=await bcrypt.hash(password, saltRounds);
    // Send to DB
   
       
        const user=new User(
            {
                firstName,
                lastName,
                email,
                age,
                password:hashedPassword,
                phone
            }
        );
    await user.save();
    res.send("User Signed Up!");}
    catch(err){
        res.status(400).send("Error Occured:"+err.message);
    };
});
authRouter.post("/login",async (req,res)=>{
    try{
       const {email,password}=req.body;
       const user=await User.findOne({email:email});
       if(!user){
        throw new Error("Invalid email");
       }
       const isValidPassword=await user.validatePassword(password);
       if(!isValidPassword){
        throw new Error("Invalid password");
       }else{
        //create token
        const token= await user.getJWT();
        //send the token to user
        res.cookie("token",token,{expires: new Date(Date.now()+ 8*3600000)});
        res.send("User logged in");
       }
    }catch(err){
        res.status(400).send("Error Occured:"+err.message);
    }
});
authRouter.post("/logout",async (req,res)=>{
    res.cookie("token",null,{
        expires: new Date(Date.now()),
    });
    res.send("User logged out");
});
module.exports=authRouter;

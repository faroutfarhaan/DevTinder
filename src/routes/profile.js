const express=require('express');
const profileRouter=express.Router();
const {userAuth}=require("../config/middlewares/Auth.js");
const bcrypt=require('bcrypt');
const saltRounds=10;
const validator=require('validator');
const{validateProfileEdit}=require("../utils/validator.js")

profileRouter.get("/profile/view",userAuth, async (req,res)=>{
    try{
       
       const user=req.user;
       
       res.send(user);

    }
    catch(err){
        res.status(400).send("Error Occured:"+err.message);
    }
    
});
profileRouter.patch("/profile/edit",userAuth,async (req,res)=>{
    try{
         if(!validateProfileEdit(req)){
            throw new Error("Invalid update request");
         };
         const loggedUser=req.user;
         Object.keys(req.body).forEach((keys)=>(loggedUser[keys]=req.body[keys]));
         await loggedUser.save();
         res.json({
            message: '${firstName}, your data has been updated successfully' ,
            data: loggedUser,
         });


    }catch(err){
        res.status(400).send("Error Occured:"+err.message);
    }
});
profileRouter.patch("/profile/password",userAuth,async (req,res)=>{
    try{
        const loggedUser=req.user;
        const {password}=req.body;
        
        if(!validator.isStrongPassword(password) ){
            throw new Error("Password is not strong");
        }
        const isSame=await bcrypt.compare(password,loggedUser.password);
        if(isSame){
            throw new Error("New password is same as old");
        }
        const hashedPassword=await bcrypt.hash(password,saltRounds);
        loggedUser.password=hashedPassword;
       await loggedUser.save();
        res.send("Password updated successfully");

    }catch(err){
        res.status(400).send("Error Occured:"+err.message);
    }
});
module.exports=profileRouter;
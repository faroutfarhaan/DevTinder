const express=require('express');
const profileRouter=express.Router();
const {userAuth}=require("../config/middlewares/Auth.js");

profileRouter.get("/profile",userAuth, async (req,res)=>{
    try{
       
       const user=req.user;
       
       res.send(user);

    }
    catch(err){
        res.status(400).send("Error Occured:"+err.message);
    }
    
});
module.exports=profileRouter;
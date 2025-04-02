const express=require('express');
const requestRouter=express.Router();
const {userAuth}=require("../config/middlewares/Auth.js");
requestRouter.post("/sendConnectionRequest",userAuth,async (req,res)=>{
    const user=req.user;
    res.send("sent");
});
module.exports=requestRouter;
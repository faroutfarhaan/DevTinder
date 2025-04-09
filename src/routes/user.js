const express=require("express");
const userRouter=express.Router();
const {userAuth}=require("../config/middlewares/Auth");
const ConnectionRequest=require("../config/models/connectionRequest");

const SAFE_USER_DATA="firstName lastName skills about photoUrl age";
userRouter.get("/user/requests/received",userAuth,async(req,res)=>{
    try{
        const user =req.user;
        const requests=await ConnectionRequest.find({
            receiverId:user._id,
            status: "interested"
        }).populate("senderId",SAFE_USER_DATA);
      
        res.status(200).json(requests);
                                  
    }
    catch(err){
        res.status(400).send("ERROR: "+ err.message);
    }
});
userRouter.get("/user/connections",userAuth,async (req,res)=>{
    try{
               const user =req.user;
               const connections=await ConnectionRequest.find({
               $or:
               [
                { receiverId:user._id,
                status: "accepted"},
                {
                    senderId:user._id,
                    status: "accepted"}
                ],
               }).populate("senderId",SAFE_USER_DATA)
               .populate("receiverId",SAFE_USER_DATA);
               const data=connections.map((row)=>
            { //u cannot comapre two mongodb ids directly
                if(row.senderId._id.toString()===user._id.toString()){
                    return row.receiverId;
                }else if(row.receiverId._id.toString()===user._id.toString()){
                   return row.senderId;
                }
            });//this will return only the data of users who are my connections i.e. it will ignore are the data of connection request
               res.json({data});

    }catch(err){
        res.status(400).send("ERROR: "+ err.message);
    }
});
userRouter.get("/feed",userAuth,async (req,res)=>{
     try{
         const loggedUser=req.user;
         const page=parseInt(req.query.page);
         let limit=parseInt(req.query.limit);
         limit=limit>50 ?50:limit;
         const skip=(page-1)*limit;
         const connections =await ConnectionRequest.find({
            $or:[{senderId:loggedUser._id},{receiverId:loggedUser._id}]
         }).select("senderId receiverId");
         const hideUserFromFeed=new Set();
         connections.forEach((req)=>{
                hideUserFromFeed(req.senderId._id)
                hideUserFromFeed(req.receiverId._id)
         });
         const feed=await User.find({
            $and:[{_id: {$in: Array.from(hideUserFromFeed)}}
                ,{_id: {$ne: loggedUser._id}},],
            
         }).select(SAFE_USER_DATA).skip(skip).limit(limit);
         res.json({feed});
     }catch(err){
        res.status(400).send("ERROR: "+ err.message);
     }
});
module.exports=userRouter;
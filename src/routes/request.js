const express=require('express');
const requestRouter=express.Router();
const {userAuth}=require("../config/middlewares/Auth.js");
const ConnectionRequest=require("../config/models/connectionRequest.js");
const User=require("../config/models/user.js");
requestRouter.post("/request/send/:status/:toUserId",userAuth,async (req,res)=>{
    try{
    const user=req.user;
    const senderId=user._id;
    const status=req.params.status;
    const receiverId=req.params.toUserId;
    const allowedStatus=["interested","ignored"];
    if(!allowedStatus.includes(status)){
        throw new Error("Invalid status");
    };
    if(senderId==receiverId){
        throw new Error("You can't send request to yourself");
    };
    const isUserValid=await User.findById(receiverId);
    if(!isUserValid){
       return res.status(404).json({message:"User you are trying to send request doesn't exists."})
    };
    const existingConnectionRequest=await ConnectionRequest.findOne({
        $or:[
            {senderId,receiverId},
            {senderId:receiverId,receiverId:senderId},
        ],
    });
    if(existingConnectionRequest){
        return res.status(400).json({message:"connection request already exists."});
    };
    const connectionRequest=new ConnectionRequest(
         {
            senderId,
            receiverId,
            status
         }
    );
    await connectionRequest.save();
    res.status(200).json({message:"connection request sent successfully"});

}
catch(err){
    console.error("Request Error:", err);
    res.status(400).json({ error: err.message });
};

    
});
requestRouter.post("/request/review/:status/:requestId",userAuth,async (req,res)=>{
      try{
              const status=req.params.status;
              const requestId=req.params.requestId;
              const user=req.user;
              const senderId=user._id;

              
              const allowedStatus=["accepted","rejected"];
              if(!allowedStatus.includes(status)){
                  throw new Error ("Invalid status");
                }
                
                const connectionRequest= await ConnectionRequest.findById(requestId);
                if(!connectionRequest){
                    throw new Error ("connection request doesn't exists.");
                }
                const receiverId=connectionRequest.receiverId;
                if(senderId==receiverId){
                    throw new Error ("You can't review your own request");
                }
                if(connectionRequest.status=="ignored"){
                    throw new Error ("You can't review ignored request");
                }
              
              connectionRequest.status=status;
              await connectionRequest.save();
              res.status(200).json({message:"connection request " + status +" successfully"});
      }catch(err){
        res.status(400).send("ERROR: "+ err.message);
      }
});

module.exports=requestRouter;
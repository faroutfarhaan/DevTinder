const jwt=require('jsonwebtoken');
const User=require("../models/user");
const userAuth= async (req,res,next)=>{
 try{
 const {token}=req.cookies;
 if(!token){
    throw new Error('You must be logged in to access this route');
 }
 const decodedObj =await jwt.verify(token,"AbraCaDabra@123");
 const{_id}=decodedObj;
 const user=await User.findById(_id);
 if(!user){
    throw new Error('User not found');
 }
 //attach user to request
    req.user=user;
    next();
 
 }
 catch(err){
    res.status(400).send("ERROR: "+err.message);
 }
};
module.exports={userAuth};
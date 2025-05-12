const jwt=require('jsonwebtoken');
const User=require("../models/user");
const userAuth= async (req,res,next)=>{
 try{
 const {token}=req.cookies;
 if(!token){
    return res.status(401).send("Unauthorized! Login first");
 }
 const decodedObj =await jwt.verify(token,"AbraCaDabra@123");
 const{_id}=decodedObj;
 const user=await User.findById(_id);
 if(!user){
    return res.status(404).send("user not found");
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
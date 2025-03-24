const express = require("express");
const app =express();
const {connectDB}=require("./config/database.js");
const User=require("./config/models/user.js");
app.use(express.json());
// Get user using email API
app.get("/user", async (req,res)=>{
    const userEmail=req.body.email;
    try{
        const users=await User.findOne({email:userEmail});
        if(users.length===0){
            res.status(404).send("User not found");
        }else{
            res.send(users);
        }
    }
    catch (err){
        res.status(400).send("Something went wrong");
    }
});
// Feed Api
app.get("/feed", async (req,res)=>{
    try{
        const users=await User.find();
        if(users.length===0){
            res.status(404).send("No users found");
        }else{
            res.send(users);
        }
    }
    catch (err){
        res.status(400).send("Something went wrong");
    }
});
// delete api
app.delete("/user", async (req,res)=>{
    const userId=req.body.userId;
    try{
        await User.findByIdAndDelete(userId);
        res.send("user deleted successfully");
    }
    catch(err){
        res.status(400).send("Something went wrong");
    }


});
// update api
app.patch("/user/userId", async (req,res)=>{
    const userId=req.params.userId;
    const data=req.body;
    try{
        const ALLOWED_UPDATES=["photoUrl","gender","skills","firstName","lastName","about"];
        const isUpdateAllowed=object.keys(data).every((k)=>ALLOWED_UPDATES.includes(k));
        if(!isUpdateAllowed){
            throw new Error("Invalid update");
        }
      await User.findByIdAndUpdate({_id:userId},data,{runValidations:true});
      res.send("User updated");
    }
    catch(err){
        res.status(400).send("UPDATE FAILURE:"+ err.message);
    }
});
// SignUp Api
app.post("/signup",async (req,res)=>{
    try{
        if(req.body.age<18){
            throw new Error("Age must be 18 or above");
        } 
        const user=new User(req.body);
    await user.save();
    res.send("User Signed Up!");}
    catch(err){
        res.status(400).send("Error Occured:"+err.message);
    };
});
// connecting to DB
connectDB()
.then( ()=>{
    console.log("DB connected");
    app.listen(3000,()=>{
        console.log("Server is ready to serve mylord");
    });
})
.catch((err)=>{
    console.log("My Lord, sorry to inform you but DB has not connected");
});
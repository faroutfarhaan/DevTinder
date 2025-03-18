const express = require("express");
const app =express();
const {connectDB}=require("./config/database.js");
const User=require("./config/models/user.js");

app.post("/signup",async (rq,res)=>{
    try{ const user=new User({
        firstName:"Moh Farhan",
        lastName:"Patel",
        email:"mohfarhanpatel@gmail.com",
        phone:"123456789",
        age:"22",
        password:"abcdefgh"

    });
    await user.save();
    res.send("User Signed Up!");}
    catch(err){
        console.log(err);
    };
});
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



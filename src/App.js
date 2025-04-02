const express = require("express");
const app =express();
const {connectDB}=require("./config/database.js");
const cookieParser = require('cookie-parser');


app.use(express.json());
app.use(cookieParser());
const authRouter=require("./routes/auth.js");
const profileRouter=require("./routes/profile.js");
const requestRouter=require("./routes/request.js");

app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);


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
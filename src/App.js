// do only once in the main entry file of app only
require('dotenv').config()

const express = require("express");
const app =express();
const {connectDB}=require("./config/database.js");
const cookieParser = require('cookie-parser');
const cors =require('cors');
const http=require("http");
const {initializeSocket}=require("./utils/socket.js");



const server=http.createServer(app);
initializeSocket(server);
const allowedOrigins=["http://localhost:5173","https://dev-tinder-frontend-phi.vercel.app"];
app.use(cors({
    origin: (origin,callback)=>{
        if(!origin || allowedOrigins.includes(origin)){
            callback(null,true);
        }else{
            callback(new Error('Not allowed by CORS'));
        }
    },
     methods: ['GET', 'POST', 'PATCH', 'DELETE','PUT'],
  allowedHeaders: ['Content-Type', 'Authorization'],
    credentials:true
}));
app.use(express.json());
app.use(cookieParser());
const authRouter=require("./routes/auth.js");
const profileRouter=require("./routes/profile.js");
const requestRouter=require("./routes/request.js");
const userRouter=require("./routes/user.js");


app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);
app.use("/",userRouter);


// connecting to DB
connectDB()
.then( ()=>{
    console.log("DB connected");
    server.listen(process.env.PORT,()=>{
        console.log("Server is ready to serve mylord");
    });
})
.catch((err)=>{
    console.log("My Lord, sorry to inform you but DB has not connected");
});
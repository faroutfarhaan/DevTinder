const express = require("express");
const app =express();
app.use((req,res)=>{
    res.send("Server is ready to serve mylord");

});
app.listen(3000,()=>{
    console.log("Server is ready to serve mylord");
})

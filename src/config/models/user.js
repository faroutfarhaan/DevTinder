const mongoose= require("mongoose");
const{Schema}=require("mongoose");
const userSchema=new Schema({
    firstName:{
        type:String
    },
    lastName:{
        type:String
    },
    email:{
        type:String
    },
    age:{
        type:String
    },
    phone:{
        type:String
    },
    gender:{
        type:String
    },
    password:{
        type:String
    }
})
const User = mongoose.model("User",userSchema);
module.exports=User;
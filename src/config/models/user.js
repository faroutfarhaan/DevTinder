const mongoose= require("mongoose");
const{Schema}=require("mongoose");
const userSchema=new Schema({
    firstName:{
        type:String,
        required:true,
        trim:true
    },
    lastName:{
        type:String
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true
    },
    age:{
        type:String,
        min:15
    },
    phone:{
        type:String,
        unique:true,
        minLength:10,
        maxlength:10
    },
    gender:{
        type:String,
        enum:["male","female","others"],
        validator(value){
            if(!["male","female","others"].includes(value)){
                throw new err("Gender data is invalid")
            }
        }
    },
    password:{
        type:String,
        minLength:8,
        required:true
    }
},{
    timestamps:true
})
const User = mongoose.model("User",userSchema);
module.exports=User;
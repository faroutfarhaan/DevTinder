const mongoose= require("mongoose");
const{Schema}=require("mongoose");
const validator=require("validator");
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
        lowercase:true,
        validate(value){
           if(!validator.isEmail(value)){
            throw new Error("Invalid Email address"+value);
           }
        }
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
        required:true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Password is weak");
        }
    },
    skills:{
        type:[String],
        maxlength:10
    },
    about:{
        type: String,
        maxlength:100,
        default:"Hey there, I m using DevTinder."
    },
    photoUrl:{
        type:String,
        default:"https://images.app.goo.gl/DXot8tb2dzE6jXPPA",
        vaidate(value){
            if(!validator.isURL(value)){
                throw new Error("Invalid photo");
            }
        }
    }
},{
    timestamps:true
})
const User = mongoose.model("User",userSchema);
module.exports=User;
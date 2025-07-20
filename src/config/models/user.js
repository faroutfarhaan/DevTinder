const mongoose= require("mongoose");
const{Schema}=require("mongoose");
const validator=require("validator");
const jwt=require("jsonwebtoken");
const bcrypt = require('bcrypt');
const userSchema=new Schema({
    firstName:{
        type:String,
        index: true,
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
        type: Number, 
        required: [true, "Age is required"],
        min: [15, "Age must be at least 15"],
        max: [100, "Age cannot exceed 100"]
    },
    phone:{
        type: String,
        required: [true, "Phone number is required"],
        unique: true,
        minLength: 10,
        maxLength: 10
    },
    gender:{
        type:String,
        required:true,
        enum:{
            values:["male","female","others"],
            message:'{VALUE} is not a valid gender'
    }
        // validator(value){
        //     if(!["male","female","others"].includes(value)){
        //         throw new err("Gender data is invalid")
        //     }
        // }
    },
    password:{
        type:String,
        minLength:8,
        required:true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Password is weak");
        }
    }},
    skills:{
        type:[String],
        maxLength:10
    },
    about:{
        type: String,
        maxLength:100,
        default:"Hey there, I m using DevTinder."
    },
    photoUrl:{
        type:String,
        default:"https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png",
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("Invalid photo");
            }
        }
    }
},{
    timestamps:true
});
userSchema.methods.getJWT=async function (){
  const user=this;
  const token=await jwt.sign({_id:this._id},process.env.JWT_SECRET,{expiresIn:"1d"});
  return token;
};
userSchema.methods.validatePassword= async function (passwordInputByUser){
    const user=this;
    const passwordHash=user.password;
    const isValid=await bcrypt.compare(passwordInputByUser,passwordHash);
    return isValid;
}
userSchema.index({firstName: 1,lastName:1});
const User = mongoose.model("User",userSchema);
module.exports=User;
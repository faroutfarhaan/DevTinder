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
        type:String,
        min:15
    },
    phone:{
        type: String,
        required: [true, "Phone number is required"],
        unique: true,
        minLength: 10,
        maxlength: 10
    },
    gender:{
        type:String,
        enum:{
            values:["male","female","others"],
            message:'${VALUE} is not a valid gender'
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
});
userSchema.methods.getJWT=async function (){
  const user=this;
  const token=await jwt.sign({_id:this._id},"AbraCaDabra@123",{expiresIn:"1d"});
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
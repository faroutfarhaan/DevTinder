const mongoose=require("mongoose");

const connectDB= async ()=>{
    await mongoose.connect("mongodb+srv://mohdfarhanofficial999:4up3t0hozFkRqMKa@nodejs.w9wh7.mongodb.net/DevTinder");
    
};
module.exports={connectDB};
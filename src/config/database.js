
const mongoose=require("mongoose");

const connectDB= async ()=>{
    await mongoose.connect(process.env.DATABASE_SECRET);
    
};
module.exports={connectDB};
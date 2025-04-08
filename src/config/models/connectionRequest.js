const mongoose=require('mongoose');
const connectionReqSchema=new mongoose.Schema({
    senderId:{type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User',
    },
    receiverId:{type:mongoose.Schema.Types.ObjectId,
        required:true,
        // creating a reference to the user model
        ref:"User"
    },
    status:
    {
        type:String,
        required:true,
        enum: {
           values: ["pending", "accepted", "rejected", "interested","ignored"],
           message:'${VALUE} status is not valid'
        }
    }
},{timestamps:true});
connectionReqSchema.index({senderId:1,receiverId:1});
const ConnectionRequest = mongoose.model("ConnectionRequest",connectionReqSchema);
module.exports=ConnectionRequest;

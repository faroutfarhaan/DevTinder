const adminAuth=(req,res,next)=>{
    const token ="xyz";
    const isAdminAuthorised=token==="xyz";
    if(!isAdminAuthorised){
        res.status(404).send("Not Authorised");
    }else{
        next();
    }
};
const userAuth=(req,res,next)=>{
    const token ="xyz";
    const isUserAuthorised=token==="xyz";
    if(!isUserAuthorised){
        res.status(404).send("Not Authorised");
    }else{
        next();
    }
};
module.exports={
    adminAuth,userAuth
};

const validator=require("validator");
const validateSignup = (req) => {
    const { firstName, lastName, password, email, age, phone,gender } = req.body;
    const validGenders = ['male', 'female', 'others'];

    if (!validator.isEmail(email)) {
        throw new Error("Invalid email");
    } else if (!validator.isStrongPassword(password)) {
        throw new Error("Choose a strong password");
    } else if (age < 15) {
        throw new Error("Age should be greater than 15");
    } else if (firstName.length == 0 || lastName.length == 0) {
        throw new Error("First name and last name cannot be empty");
    } else if (!phone || phone.length !== 10) {
        throw new Error("Phone number must be 10 digits");
    }else if(!validGenders.includes(gender.toLowerCase())){
        throw new Error("Invalid gender");
    }
};
const validateProfileEdit=(req)=>{
    const authorizedFields=["firstName","lastName","age","about","gender","photoUrl","skills"];
    const isAllowed=Object.keys(req.body).every(fields=>authorizedFields.includes(fields));
    return isAllowed;
}
module.exports = { validateSignup,validateProfileEdit };
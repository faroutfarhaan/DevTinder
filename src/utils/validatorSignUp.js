const validator=require("validator");
const validateSignup = (req) => {
    const { firstName, lastName, password, email, age, phone } = req.body;
    
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
    }
};
module.exports = { validateSignup };
const { findUser, createUser, updateUserDetails } = require("../repositories/userRepository");
const {createCart} = require('../repositories/cartRepository');
const InternalServerError = require("../utils/internalServerError");
    // userDetails is a object conataining details of the user
    async function registerUser(userDetails) {
    // it will create a brand new user in the database

    // 1. we need to check if the user with this email and mobile no. already exists in the database or not
    const user = await findUser({
        email: userDetails.email,
        mobileNumber: userDetails.mobileNumber,
    });
    if (user) {
        // we found the user
        throw {
        reason: "User with given email or mobNo already exists",
        statusCode: 400,
        };
    }

    // 2. if user does not exist then create user in the database
    const newUser = await createUser({
        email: userDetails.email,
        password: userDetails.password,
        firstName: userDetails.firstName,
        lastName: userDetails.lastName,
        mobileNumber: userDetails.mobileNumber,
        role:userDetails.role,
        address:userDetails.address
    });
    if (!newUser) {
        throw { 
            reason: "cannot create user", 
            statusCode: 500,
            message:'newUser not created'
        };
    }
    // 3. return the details of created user
    await createCart(newUser._id)
    return newUser;
}
async function userUpdate(data){
    const response = await updateUserDetails(data)
    if(!response){
        throw{
            reason: "cannot update user", 
            statusCode: 500,
            message:'User not updated'
        }
    }
    return response
}
module.exports = {
  registerUser,
  userUpdate
};

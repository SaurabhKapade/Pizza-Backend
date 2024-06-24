const { findUser, createUser } = require("../repositories/userRepository");

    // userDetails is a object conataining details of the user
    async function registerUser(userDetails) {
    // it will create a brand new user in the database

    // 1. we need to check if the user with this email and mobile no. already exists in the database or not
    const user = await findUser({
        email: userDetails.email,
        mobileNumber: userDetails.mobilenumber,
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
    });
    if (!newUser) {
        throw { reason: "cannot create user", statusCode: 500 };
    }
    // 3. return the details of created user
    return newUser;
}

module.exports = {
  registerUser,
};

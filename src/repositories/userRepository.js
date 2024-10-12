const user = require("../schema/userSchema");
async function findUser(parameters) {
    try {
        const response = await user.findOne({ ...parameters });
        return response;
    } catch (err) {
        console.log(err);
    }
}

async function createUser(userDetails) {
    try {
        const response = await user.create(userDetails);
        return response;
    } catch (err) {
        console.log(err);
    }
}

async function updateUserDetails(userDetails){
    try{
        const olduser = await user.findOne({_id:userDetails.id})
        console.log('comming details ',userDetails)
        console.log('old user is ',olduser) 
        const response = await user.findOneAndUpdate({_id:userDetails.id},{
            $set:{
                firstName:userDetails.firstName,
                lastName:userDetails.lastName,
                email:userDetails.email,
                mobileNumber:userDetails.mobileNumber
            }
        },{new:true})
        console.log('new user is ',response)
        return response
    }catch(error){
        console.log(error)
    }
}

module.exports = {
  findUser,
  createUser,
  updateUserDetails
};

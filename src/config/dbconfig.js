const mongoose = require('mongoose');
const serverConfig=require('./serverConfig');

async function connectDB(){
    try{
        // await mongoose.connect(serverConfig.DB_URL)
        await mongoose.connect(serverConfig.DB_URL)
        console.log('connected to database')
    }catch(err){
        console.log('cant connect to the database');
        console.log(err);
    }
}
module.exports=connectDB
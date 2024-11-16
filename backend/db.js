const mongoose = require('mongoose');


const mongoURI = "mongodb+srv://toyashpatil17:HJoxfaL3fLpbCzbK@cluster0.q19dj.mongodb.net/";

const connectTOMongo = async () => {
    await mongoose.connect(mongoURI);
    console.log("Connected to Mongodb")

}

module.exports = connectTOMongo;
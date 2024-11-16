const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    name:{
        type:String,
        require:true,
    },
    password:{
        type:String,
        require:true,
        unique:true
    },
    Wallet:{
        type:Number,
    },
    

});
const User =mongoose.model('user',userSchema);
User.createIndexes();
module.exports=User;
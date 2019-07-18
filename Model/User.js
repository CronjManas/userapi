const mongoose = require('mongoose');
// let ObjectId = mongoose.Schema.Types.ObjectId;
const UserSchema = mongoose.Schema({
    UserId:{
        type:Number,
        required:true 
    },
    Name:{
        type:String,
        required:true
    },
    Dob:{
        type:Date,

    },
    Gender:{
        type: String
    },
    Address:{
        type: String
    },
    City : {
        type:String
    },
    Profession:{
        type: String
    }

})

module.exports = mongoose.model('User',UserSchema);
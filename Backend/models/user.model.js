const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    fullname:{
        firstname:{
            type:String,
            requried:true,
            minlength:[3,'First name must be at least 3 characters long']
        },
        lastname:{
            type:String,
            minlength:[3,'First name must be at least 3 characters long']
        }
    },
    email:{
        type:String,
        requried: true,
        unique:true,
        minlength:[5 ,'Email must be at least 5 charachers long']
    },
    password:{
        type:String,
        requried:true,
        select:false
    },
    socketId:{
        type:String
    }
});

userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id: this._id}, process.env.JWT_SECRET);
    return token;
}

userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password , this.password);
};

userSchema.statics.hashPassword = async function(password){
    return await  bcrypt.hash(password , 10);
}


/**
 * Check if email is taken
 * @param {string} email - The user's email
 * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */

userSchema.statics.isEmailTaken = async function (email, excludeUserId) {
    const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
    return !!user;
  };



const userModel = mongoose.model('user' , userSchema);

module.exports = userModel;
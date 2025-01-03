const { default: status } = require('http-status');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const captainSchema = new mongoose.Schema({
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
    },
    status:{
        type:String,
        enum:["active","inactive"],
        default:"inactive"
    },
    vehicle:{
       color:{
           type:String,
           required:true,
              minlength:[3,'Color must be at least 3 characters long']
       },
       plate:{
           type:String,
           required:true,
              minlength:[3,'Plate must be at least 3 characters long']
       },
       capacity:{
           type:Number,
           required:true,
           min:[1,'Capacity must be at least 1 characters long']
       },
       vehicleType:{
           type:String,
           required:true,
           enum:["motorcycle","car","auto"]
       }
    },
    location:{
       lat:{
           type:Number,
       },
         lng:{
              type:Number,
         }
    }
});

captainSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id: this._id}, process.env.JWT_SECRET , { expiresIn: '24h' });
    return token;
}

captainSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password , this.password);
};

captainSchema.statics.hashPassword = async function(password){
    return await  bcrypt.hash(password , 10);
}

/**
 * Check if email is taken
 * @param {string} email - The user's email
 * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */

captainSchema.statics.isEmailTaken = async function (email, excludeUserId) {
    const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
    return !!user;
  };

module.exports = mongoose.model('Captain', captainSchema);
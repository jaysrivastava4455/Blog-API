const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
// const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
    username :{
        type:String,
        required : true
    },
    email:{
        type:String, 
        required : true,
        unique : true

    },
    password :{
        type : String,
        required : true


},    
otp:{ type : String

}
    
}); 

userSchema.pre('save',async function (next){
    const user = this;
    if(user.isModified('password')){

   

    // const salt = await bcrypt.genSalt(10);


    // ye upar wale ke alava bhi hm sidhe use lar sakte hai 10 at place of salt
    // user.password = await bcrypt.hash(user.password, 10); ye bhi shi hai samje 
    user.password = await bcrypt.hash(user.password, 10);
    
    }
next(); 
})

const User = mongoose.model('User',userSchema);
module.exports= User;


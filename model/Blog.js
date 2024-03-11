const mongoose = require('mongoose')
const User = require('./user')

const blogschema = mongoose.Schema({
    title:{

        require:true,
        type:String

    },
    blog:{

        require:true,
        type:String

    },
    owner:{
        type : mongoose.Schema.Types.ObjectId,
        require:true,
        ref:User
        

    },
    
      
    
},{
    timestamps:true

}
);

const blog= mongoose.model('blog',blogschema)
module.exports = blog;
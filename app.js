const express= require('express');
const app = express();
const bodyparser= require('body-parser');
const PORT = 8000;
const cors= require('cors');
const authRouter = require('./route/authRoutes');
const blogRouter = require('./route/blogRouter');


require('dotenv').config();
require('./db');


// *******************************************middle ware
app.use(cors());
app.use(bodyparser.json());
// we can use the express.json() instead of body parser

app.use('/user' , authRouter);
app.use('/blog',blogRouter);


 

// ******************************************

app.get('/',(req,res)=>{
    res.json({massage :'this is right'})
});

app.listen(PORT,()=>{
    console.log("listing to the port 8000")
})








const express = require('express');
const router = express.Router();
const Blog = require('../model/blog')
const auth = require('../middleware/auth');


router.post('/createblog',auth, async(req,res)=>{
    // console.log(req.user);
    const owner = req.user._id;
    const {title,blog}= req.body;
    try {
        const newblog= new Blog({title,blog,owner});
        await newblog.save();
        res.json({message:'blog is created'});

    } 
    
    catch (error) {
        res.json({ message:error})
    }


})


router.get('/getallblogs',async(req,res)=>{
    try {
        const blogs=await Blog.find({});
        res.json({message:'blog is created successfully',
    blogs})
    
    } catch (error) {
        res.json({message:error});
    }
});

router.get('/getallblogs/:id',async(req,res)=>{
    try {
        
        const blog = await Blog.findById(req.params.id);
        res.json({message:'blog is created successfully',
        blog})

    } catch (error) {
        res.json({message:error});
    }
    
})

router.patch('/updatblogs/:id',auth,async(req,res)=>{
    const {title,blog} = req.body;
    try {
        const newblog = Blog.findByOne({_id:req.params.id, owner : req.user._id});
    if(!blog){
        res.json({
            message:'not a blog'
        })
        newblog.title= title;
        newblog.blog=blog;
        await newblog.save();

    }
    res.json({massage:'successfully updateed the blog'});
        
    } catch (error) {
        
    }
    
})

module.exports=router;
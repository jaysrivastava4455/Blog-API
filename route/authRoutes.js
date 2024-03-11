const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../model/user");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
require("dotenv").config();

// ************************************************************************************************************
//  const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
//  router.get('/',(req,res)=>{
//     res.json({
//         massage : 'user created y'
//     })
//  })
// *********************************************************************************************************
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = new User({
      username,
      email,
      password,
      // we also wirte the above req.body line in this too
      // username : req.body,
      // email:req.body,
      // password : req.body
    });
    await user.save();
    res.json({
      massage: "user created succcfully",
    });
  } catch (err) {
    res.status(500).json({ massage: err.message });
  }
});

//  **************************************************?

router.post("/login", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        massage: "user not found",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        massage: "INvalid credential",
      });
    }

    const token = jwt.sign(
      {
        userId: user._id,
      },
      process.env.JWT_SECRET_KEY
    );
    // hm yaha pe ye define kar skate hai ki token expire kb hoga ;

    res.json({
      massage: "user is loggedin successfully",
      token,
      user,
    });
  } catch (err) {
    res.status(500).json({
      massage: err.message,
    });
  }
});

//  *********************************************************

const transpoter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "jayshanakar24@gmail.com",
    pass: "xsxvacovyqrvqeok",
  },
});

router.post("/sendotp", async (req, res) => {
  const { email } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000);
  try {
    const mailOption = {
      from: "jayshanakar24@gmail.com",
      to: email,
      subject: "you otp for the verificatio",
      text: `your otp for verfication is ${otp}`,
    };

    const user = await User.findOne({ email });
    if (!user) {
      res.status.json({ massage: "you are not register" });
    }
     user.otp = otp;
      await user.save();

    // console.log(otp);
    transpoter.sendMail(mailOption, async (err, info) => {
      if (err) {
        console.log("error occured" + err);
        res.status(500).json({
          massage: err.message,
        });
      } else {
        res.json({
          massage: "otp sent successfully",
        });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      massage: err.massage,
    });
  }
});

// connect with the smpt(simple mail trasfer  protocol)
//   const transporter = nodemailer.createTransport({
//     host: 'smtp.ethereal.email',
//     port: 587,
//     auth: {
//         user: 'freeda91@ethereal.email',
//         pass: 'aAevMYgnEbA3ymHcSn'
//     }
// });

// router.post('/sendotp',async(req,res)=>{
//     // const email=req.body;
//     // const otp = Math.floor(100000+Math.random()*900000);
//     try {
//         const info = await transporter.sendMail({
//             from: '"Maddison Foo Koch 👻" <freeda91@ethereal.email>', // sender address
//             to: "jayshankar224@gmail.com", // list of receivers
//             subject: "Hello ✔", // Subject line
//             text: "Hello world?", // plain text body
//             // html: "<b>Hello world?</b>", // html body
//           });

//           console.log("Message sent: %s", info.messageId);

//     } catch (error) {
//         console.log(error);
//         res.status(500).json({massage:error.massage})

//     }

// })

// *************************************************************************************


router.post('/changepassword', async(req,res)=>{
    const{email,otp,newpassword}=req.body;
    const user = await User.findOne({ email });
    try {
        if(!user){
            res.status(400).json({massage:'not registered  user'});
        }
    
        if(user.otp!=otp)
        {
        res.json({massage :'your otp is worng '})
        }
            user.password=newpassword;
            user.otp=null;
            await user.save();
            res.json({massage:'your password is changed successfully'})
        
        
    } 
    catch (error) {
        res.json({
            massage:'you are not registered'
        })
    }
    
    
})


module.exports = router;

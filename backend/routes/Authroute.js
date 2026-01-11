const User=require("../models/Usermodel");
const express=require("express");
const router= express.Router();
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");

router.post("/register", async (req,res)=>{
    try{
   
        const {name,email,password}=req.body;
        const existUser=await User.find({email});
        if(existUser){
            return  res.status(400).json({
                success:false,
                message:"User already exist"

            })
        }
        
        const user=await User.create({
            name,email,password
        });
        const token= jwt.sign(
        
           { userId:user_.id,

           },
           process.env.JWT_secret,
           {
            expiresIn:'7d'
           }
        )

        res.status(201).json({
            token,
            success:true,
            user:{
                id:user_.id,
                name:user.name,
                email:user.email

            }
        });

    }catch(error){
        res.status(500).json({
            status:false,
            message:error.message
        });

    }

});

router.post("/login",async (req,res)=>{
    try{
          
        const {email,password}=req.body;
        const user=await User.findByOne({email}).select('+password');

        if(!user){
            return res.status(401).json({
                success:false,
                message:"User Not find"
            })
        }
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(401).json({
                success:false,
                message:"Not valid credentials"
            })
        }
        const token=jwt.sign({
            userId:user_.id
        },
        process.env.JWT_SECRET,
        {expiresIn:'7d'}
    )
       res.status(200).json({
        token,
        success:true,
        user:{
            id:user_.id,
            email:user.email,
            name:user.name
        }
       });

    } catch(error){
        res.status(401).json({
            success:false,
            message:error.message
        })
    }
});

module.exports=router;
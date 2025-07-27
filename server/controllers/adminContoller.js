import jwt from 'jsonwebtoken'
import Blog from '../models/Blog.js';
import Comment from '../models/Comment.js';
import { Component } from 'react';


export const adminLogin =async (req , res)=>{
    try{
        const {email,password} = req.body;

        if(email !==process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD){
            return res.json({success: false, message: "Invalid Credentials"})
        }
    
    const token = jwt.sign({email}, process.env.JWT_SECRET)
    res.json({success:true , token})

    } catch (error){
res.json({success: false , message:error.message})
    }
}

export const getAllBlogsAdmin =async (req , res)=>{

    try {
        const blogs = await Blog.find({}).sort({createdAt: -1});
        res.json({success:true, blogs})
        
    } catch (error) {
        res.json({success:false , message:error.message})
        
    }
}

export const getAllComments =async (req , res)=>{
 try {
    
    const comments = await Comment.find({}).populate("blog").sort({createdAt: -1})
    res.json({success: true, comments})
 } catch (error) {
    
     res.json ({success: false , message:error.message})
 }
}

export const getDashboard =async (req , res)=>{

    try {
         
        const recentBlogs =await Blog.find({}).sort({createdAt: -1}).limit(5);
        const blogs = await Blog.countDocuments();
        const comments = await Component.countDocuments();
        const drafts = await Blog.countDocuments({isPublished:false})

        const dashboardData= {
            blogs , comments , drafts, recentBlogs
        }
    res.json({success: true, comments})
    } catch (error) {
           res.json ({success: false , message:error.message})
    }
}


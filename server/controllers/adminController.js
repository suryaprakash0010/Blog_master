import jwt from "jsonwebtoken";
import Blog from "../models/Blog.js";
import Comment from "../models/Comment.js";
import User from "../models/User.js";
import bcrypt from "bcrypt";

export const adminLogin = async (req, res) => {
    
    try {
        const { email, password } = req.body;

        // if (email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD) {
        //     return res.json({ success: false, message: 'Invalid credentials' });
        // }
        if (!email || !password) {
            return res.json({ success: false, message: 'Email and password are required' });
        }
        const user = await User.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: 'User not found' });
        }
        // check password
        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch) {
            return res.json({ success: false, message: 'Invalid credentials' });
        }
        // Generate token
        const token = jwt.sign({ email }, process.env.JWT_SECRET);

        return res.json({ success: true, token });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}
export const adminSignup = async (req, res) => {

try {
    const { email, password, firstName, lastName } = req.body;

    if (!email || !password || !firstName || !lastName) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.findOneAndUpdate(
      { email },
      {
        firstName,
        lastName,
        email,
        password: hashedPassword,
      },
      {
        upsert: true,
        new: true,    
        setDefaultsOnInsert: true,
      }
    );

    const token = jwt.sign({ email }, process.env.JWT_SECRET);
    res.setHeader('Authorization', token);
    return res.status(201).json({ success: true, token, message: 'Signup successful', user });
  } catch (error) {
    console.error("Server error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};



export const getAllBlogsAdmin = async (req, res) => {

    try {
        const blogs = await Blog.find({}).sort({ createdAt: -1 });
        res.json({ success: true, blogs });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}

export const getAllComments = async (req, res) => {

    try {
        const comments = await Comment.find({}).sort({ createdAt: -1 }).populate('blog');
        res.json({ success: true, comments });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}

export const getDashboard = async (req, res) => {

    try {
        const recentBlogs = await Blog.find({}).sort({ createdAt: -1 }).limit(5);
        const blogs = await Blog.countDocuments();
        const comments = await Comment.countDocuments();
        const drafts = await Blog.countDocuments({ isPublished: false });

        const dashboardData = {
            recentBlogs,
            blogs,
            comments,
            drafts
        };
        res.json({ success: true, dashboardData });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}

export const deleteCommentById = async (req, res) => {

    try {
        const { id } = req.body;
        await Comment.findByIdAndDelete(id);
        res.json({ success: true, message: 'Comment deleted successfully' });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}

export const approveCommentById = async (req, res) => {

    try {
        const { id } = req.body;
        await Comment.findByIdAndUpdate(id, { isApproved: true });
        res.json({ success: true, message: 'Comment approved successfully' });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}
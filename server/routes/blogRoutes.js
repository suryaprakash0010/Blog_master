import express from 'express';
import { addBlog, addComment, deleteBlogById, generateContent, getAllBlogs, getBlogById, getBlogComments, togglePublish } from '../controllers/blogController.js';
import upload from '../middleware/multer.js';
import { auth, adminAuth } from '../middleware/auth.js';

const blogRouter = express.Router();

// Public routes
blogRouter.get('/all', getAllBlogs);
blogRouter.get('/:blogId', getBlogById);

// Comment routes
blogRouter.post('/add-comment', addComment);
blogRouter.post('/comments', getBlogComments);

// Protected routes
blogRouter.post('/generate', auth, generateContent);

// Admin only routes
blogRouter.post('/add', upload.single('image'), adminAuth, addBlog);
blogRouter.post('/delete', adminAuth, deleteBlogById);
blogRouter.post('/toggle-publish', adminAuth, togglePublish);

export default blogRouter;
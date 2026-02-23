import express from 'express';
import { approveCommentById, deleteCommentById, getAllBlogsAdmin, getAllComments, getDashboard, adminLogin, adminSignup } from '../controllers/adminController.js';
import { adminAuth } from '../middleware/auth.js';

const adminRouter = express.Router();

// Public admin auth routes
adminRouter.post('/login', adminLogin);
adminRouter.post('/signup', adminSignup);

// Protected admin routes
adminRouter.get('/comments', adminAuth, getAllComments)
adminRouter.get('/blogs', adminAuth, getAllBlogsAdmin)
adminRouter.post('/delete-comment', adminAuth, deleteCommentById)
adminRouter.post('/approve-comment', adminAuth, approveCommentById)
adminRouter.get('/dashboard', adminAuth, getDashboard)

export default adminRouter;

// project completed successfully
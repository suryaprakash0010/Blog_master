import express from "express"
import { adminLogin, approveCommentById, deleteCommentById, getAllComments, getDashboard } from "../controllers/adminContoller.js"
import auth from "../middleware/auth.js";
import { addBlog, getAllBlogs } from "../controllers/blogController.js";
import upload from "../middleware/multer.js"; 


const adminRouter = express.Router();

adminRouter.post("/login" , adminLogin);
adminRouter.get("/comments" , auth , getAllComments);
adminRouter.get("/blogs" , auth , getAllBlogs);
adminRouter.post("/delete-comment" , auth, deleteCommentById);
adminRouter.post("/approve-comment" , auth, approveCommentById);
adminRouter.get("/dashboard" , auth, getDashboard);
adminRouter.post("/blog/add", auth, upload.single("image"), addBlog);


export default adminRouter;
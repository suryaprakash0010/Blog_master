import express from "express";
import { addBlog, addComment, deleteBlogById, getAllBlogs, getBlogById, getBlogComments, togglePublish } from "../controllers/blogController.js";
import upload from "../middleware/multer.js";
import auth from "../middleware/auth.js";
import { getComments } from "../controllers/blogController.js";
const blogRouter =express.Router();

// blogRouter.post("/add", upload.single('image'),auth, addBlog)
// blogRouter.post("/add", auth, upload.single('image'), addBlog);
blogRouter.post('/add', upload.single('image'), async (req, res) => {
  const { title, content } = req.body;
  const image = req.file?.filename;

  // save title, content, and image filename to DB
});



blogRouter.get("/all", getAllBlogs);
blogRouter.get("/:blogId", getBlogById);
blogRouter.post("/delete", deleteBlogById);
blogRouter.post("/toggle-publish", auth , togglePublish);
blogRouter.post('/add-comments' , addComment );
blogRouter.post('/get-comments', getBlogComments);
blogRouter.get('/comments/:id', getComments);



export default blogRouter;
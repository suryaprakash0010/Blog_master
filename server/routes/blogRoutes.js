import express from "express";
import { addBlog } from "../controllers/blogController";

const blogRouter =express.Router();

blogRouter.post("/add", addBlog)
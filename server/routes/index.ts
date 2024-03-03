import express from "express";
import {
  deleteBlog,
  getAllBlogs,
  getBlog,
  insertBlog,
  updateBlog,
} from "../db/crud.js";

const router = express.Router();

router.get("/blogs", async (req, res) => {
  const blogs = await getAllBlogs();
  if (blogs) return res.json(blogs);
  return res.json({ message: "Some error occurred while reading the blogs" });
});

router.post("/addblog", async (req, res) => {
  const blog: { title: string; description: string; markdown: string } =
    req.body;
  const id = await insertBlog(blog);
  res.json({ message: "Blog inserted successfully", id });
});

router.get("/blog/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const blog = await getBlog(id);
  res.json(blog);
});

router.delete("/blog/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const response = await deleteBlog(id);
  if (response == 1) {
    return res.json({
      message: "Blog deleted successfully from database.!",
      deleted: true,
    });
  }
  return res.json({
    message: "There is some error in deleteBlog()",
    deleted: false,
  });
});

router.put("/blog/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const blog = { ...req.body, id };
  const response = await updateBlog(blog);
  if (response) {
    res.json({ message: "Updation successfull", updated: true });
  }
});

export default router;

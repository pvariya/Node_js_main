const { Router } = require("express");
const {
  creatBolg,
  upload,
  getBlogs,
  like,
} = require("../controllers/blog.controler");

const blogRoute = Router();
blogRoute.post("/create", upload.single("image"), creatBolg);
blogRoute.get("/getblog", getBlogs);

// blogRoute.post("/like/:id", like);
// blogRoute.post("/comment/:id", commentBlog);

blogRoute.get("/createBlog", (req, res) => {
  res.render("creatBlog");
});

blogRoute.get("/blogs", (req, res) => {
  res.render("blogs");
});

module.exports = blogRoute;

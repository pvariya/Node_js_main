const multer = require("multer");
const Blog = require("../models/Blog.schema");
const User = require("../models/user.schema");

const storage = multer.diskStorage({
  destination: "uploade",
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({
  storage: storage,
});

const creatBolg = async (req, res) => {
  try {
    const { title, content, category } = req.body;
    const { id } = req.cookies;
    const user = await User.findById(id);
    if (!user) {
      return res.send({ msg: "User not found." });
    }
    if (!title || !content || !category || !req.file) {
      return res.send({ msg: "All fields are required." });
    }
    const blogData = {
      title,
      content,
      image: req.file.path,
      author: user.username,
      likedBy: [],
      comments: [],
      category,
    };

    if (req.cookies.role === "admin") {
      try {
        const newBlog = await Blog.create(blogData);
        res.cookie("blogId", newBlog._id, { httpOnly: true });

        res.send({ msg: `Blog created by ${user.username}`, blog: newBlog });
      } catch (error) {
        console.error(error);
        res.send({ msg: "Error creating blog." });
      }
    } else {
      res.send({ msg: "You are not authorized to create a blog." });
    }
  } catch (error) {
    console.error(error);
    res.send({ msg: "Error retrieving blogs." });
  }
};

const getBlogs = async (req, res) => {
  let data = await Blog.find(req.body);
  res.send(data);
};

// const like =async(req,res)=>{
//   let {id}=req.cookie
//   let user = await User.findById(id);
//   if(user.roal == "admin"){
//     res.send({msg:"only user use"})
//   }
//   let {blogId} = req.cookies
//   let blog = await Blog.findById(blogId);
//   if(!blog){
//     res.send({msg:"blog not found"})
//   }
//   if(blog.likedBy.includes(user._id)){
//     res.send({msg:"you already liked"})
//   }
//   blog.likedBy.push(user._id)
//   await blog.save()
//   res.send({msg:"liked"})
// }


module.exports = { upload, creatBolg, getBlogs};

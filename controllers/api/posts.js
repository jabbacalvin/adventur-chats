const Post = require("../../models/post");
const Location = require("../../models/location");
module.exports = {
  createPost,
  index,
  showPost,
  deletePost,
  updatePost,
};

async function createPost(req, res) {
  try {
    const location = await Location.findOne({
      googlePlaceId: req.body.googlePlaceId,
    });
    if (!location) {
      const newLocation = await Location.create(req.body.googleLocation);
      req.body.location = newLocation._id;
    } else {
      req.body.location = location._id;
    }

    req.body.profile = req.user.profile; // Associate with the user's profile

    const post = await Post.create(req.body);
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}

async function index(req, res) {
  try {
    const posts = await Post.find()
      .populate("categories")
      .populate("location")
      .populate({
        path: "profile",
        populate: { path: "profilePics", model: "Image" },
      })
      .populate({
        path: "comments",
        populate: { path: "profile", populate: { path: "profilePics" } },
      });
    // .populate({
    //   path: "comments",
    //   populate: { path: "profile", model: "profile" },
    // });

    console.log(posts[0].comments);
    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function updatePost(req, res) {
  try {
    const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}

async function showPost(req, res) {
  try {
    const post = await Post.findById(req.params.id)
      .populate("categories")
      .populate({
        path: "profile",
        populate: { path: "profilePics", model: "Image" },
      })
      .populate("location");
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.status(200).json(post);
  } catch (error) {
    console.error("Error fetching post:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
async function deletePost(req, res) {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

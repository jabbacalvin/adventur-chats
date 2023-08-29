const Post = require("../../models/post");

module.exports = {
  create,
  // Add this export
  delete: deleteComment,
};

async function deleteComment(req, res) {
  const post = await Post.findOne({
    "comments._id": req.params.id,
    "comments.profile": req.profile._id,
  });

  if (!post) return res.redirect("/posts");

  post.comments.remove(req.params.id);

  await post.save();

  res.status(201).json(post);
}

async function create(req, res) {
  try {
    const post = await Post.findById(req.params.id);

    if (!req.body.comment || !req.body.profile) {
      return res
        .status(400)
        .json({ error: "Comment and profile are required fields" });
    }

    post.comments.push(req.body);

    await post.save();

    res.status(201).json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

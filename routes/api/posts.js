const express = require("express");
const router = express.Router();
const postsCtrl = require("../../controllers/api/posts");

router.post("/", postsCtrl.createPost);

router.get("/", postsCtrl.index);

router.get("/:id", postsCtrl.showPost);

router.put("/:id", postsCtrl.updatePost);

router.put("/:id/comments", postsCtrl.updateComments);

router.delete("/:id", postsCtrl.deletePost);

module.exports = router;

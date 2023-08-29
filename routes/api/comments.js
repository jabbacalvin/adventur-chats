const express = require("express");
const router = express.Router();
const commentsCtrl = require("../../controllers/api/comments");
const ensureLoggedIn = require("../../config/ensureLoggedIn");

router.post("/posts/:id", commentsCtrl.create);

router.delete("/comments/:id", ensureLoggedIn, commentsCtrl.delete);

module.exports = router;

const express = require("express");
const router = express.Router();
const profilesCtrl = require("../../controllers/api/profiles");
const ensureLoggedIn = require("../../config/ensureLoggedIn");

router.get("/", profilesCtrl.index);
router.get("/:id", profilesCtrl.showOne);
router.put("/:id", profilesCtrl.update);

module.exports = router;

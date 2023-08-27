const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../../models/user");
const Profile = require("../../models/profile");
const Location = require("../../models/location");
const Image = require("../../models/image");

module.exports = {
  create,
  login,
  checkToken,
};

function checkToken(req, res) {
  console.log("req.user", req.user);
  res.json(req.exp);
}

async function create(req, res) {
  try {
    const user = await User.findOne({ email: req.body.email });
    const profile = await Profile.findOne({ username: req.body.username });
    const location = await Location.findOne({
      googlePlaceId: req.body.googlePlaceId,
    });

    if (user) {
      res.status(500).json({ error: "Email already in use." });
    } else if (profile) {
      res.status(500).json({ error: "Username not available." });
    }

    if (!location) {
      const newLocation = await Location.create(req.body);
      req.body.homeBase = newLocation._id;
    } else {
      req.body.homeBase = location._id;
    }
    const newProfileAvatar = await Image.create(req.body.avatar);
    req.body.profilePics = [newProfileAvatar];

    const newProfile = await Profile.create(req.body);
    req.body.profile = newProfile._id;
    let newUser = await User.create(req.body);
    newUser = await newUser.populate({
      path: "profile",
      populate: {
        path: "profilePics",
        model: "Image",
      },
    });

    const token = createJWT(newUser);
    res.status(200).json(token);
  } catch (err) {
    res.status(500).json({ error: "Error creating your user." });
  }
}

async function login(req, res) {
  try {
    const user = await User.findOne({ email: req.body.email }).populate({
      path: "profile",
      populate: {
        path: "profilePics",
        model: "Image",
      },
    });

    if (!user) throw new Error();
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) throw new Error();
    const profile = await Profile.findOne({ _id: user.profile });
    const token = createJWT(user);

    res.json(token);
  } catch (err) {
    res.status(400).json("Bad Credentials");
  }
}

/*--- Helper Functions --*/

function createJWT(user) {
  return jwt.sign(
    // data payload
    { user },
    process.env.SECRET,
    { expiresIn: "24h" }
  );
}

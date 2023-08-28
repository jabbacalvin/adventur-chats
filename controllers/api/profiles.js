const Profile = require("../../models/profile");
const Location = require("../../models/location");
const Image = require("../../models/image");

module.exports = {
  index,
  update,
  showOne,
};

function index(req, res) {
  Profile.find({})
    .then((profiles) => res.json(profiles))
    .catch((err) => {
      res.status(500).json(err);
    });
}

async function update(req, res) {
  try {
    if (req.body.googlePlaceId) {
      const location = await Location.findOne({
        googlePlaceId: req.body.googlePlaceId,
      });
      if (!location) {
        const newLocation = await Location.create(req.body);
        req.body.homeBase = newLocation._id;
      } else {
        req.body.homeBase = location._id;
      }
    } else {
      req.body.homeBase = null;
    }

    let updatedProfilePics = [];

    if (req.body.profilePicsNew && req.body.profilePicsNew.length > 0) {
      updatedProfilePics = [...updatedProfilePics, ...req.body.profilePicsNew];
    }

    if (req.body.profilePics && req.body.profilePics.length > 0) {
      const profilePicIds = req.body.profilePics.map((pic) => pic._id);
      updatedProfilePics = [...updatedProfilePics, ...profilePicIds];
    }

    if (req.body.useAvatar) {
      const newProfileAvatar = await Image.create(req.body.avatar);
      updatedProfilePics = [newProfileAvatar._id, ...updatedProfilePics];
    }

    const updatedProfile = await Profile.findByIdAndUpdate(
      req.params.id,
      {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        homeBase: req.body.homeBase,
        profilePics: updatedProfilePics,
        useUsername: req.body.useUsername,
        useAvatar: req.body.useAvatar,
        isMessageable: req.body.isMessageable,
        isSearchable: req.body.isSearchable,
      },
      { new: true }
    )
      .populate("profilePics")
      .populate("homeBase");

    return res.status(200).json(updatedProfile);
  } catch (error) {
    return res.status(500).json(error);
  }
}

async function showOne(req, res) {
  try {
    const profile = await Profile.findById(req.params.id)
      .populate("profilePics")
      .populate("homeBase");
    return res.status(200).json(profile);
  } catch (err) {
    return res.status(500).json(err);
  }
}

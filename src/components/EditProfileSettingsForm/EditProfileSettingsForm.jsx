import PlacesAutocomplete from "../PlacesAutocomplete/PlacesAutocomplete";
import AvatarRandomizer from "../AvatarRandomizer/AvatarRandomizer";
import ImageUpload from "../ImageUpload/ImageUpload";
import { getProfile, update } from "../../utilities/profiles-api";

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Grid,
  TextField,
  Button,
  Alert,
  FormControlLabel,
  Switch,
  Typography,
  CircularProgress,
  Modal,
  Card,
  CardMedia,
  IconButton,
  TextareaAutosize,
} from "@mui/material/";
import CloseIcon from "@mui/icons-material/Close";

export default function EditProfileSettingsForm({
  updatingProfile,
  setUpdatingProfile,
  profile,
  setProfile,
}) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState([""]);
  const [profilePics, setProfilePics] = useState([]);
  const [imagesChanged, setImagesChanged] = useState(false);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [formData, setFormData] = useState({
    profilePic: [],
    firstName: "",
    lastName: "",
    googlePlaceId: "",
    placeName: "",
    useUsername: true,
    useAvatar: true,
    isMessageable: true,
    isSearchable: true,
    bio: "",
  });

  const [locationData, setLocationData] = useState({
    googlePlaceId: "",
    placeName: "",
  });

  const randomSeed = () => {
    return Math.floor(Math.random() * 9999999999);
  };

  const [avatar, setAvatar] = useState({
    name: "Avatar",
    url: "",
  });

  const [currentProfilePicUrl, setCurrentProfilePicUrl] = useState("");
  useEffect(() => {
    if (profile && profile.profilePics && profile.profilePics[0]) {
      setProfilePics(profile.profilePics);
      setCurrentProfilePicUrl(profile.profilePics[0].url);
    } else {
      setCurrentProfilePicUrl(""); 
    }
  }, [profile, updatingProfile]);

  const updateMessage = (msg) => {
    setMessage(msg);
  };

  useEffect(() => {
    setLoading(true);
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await getProfile(profile._id); 

      setFormData(response.data);
      if (response.data.profilePics) {
        if (
          response.data.profilePics.some((item) => item.name.includes("Avatar"))
        ) {
          const avatar = response.data.profilePics.find((item) =>
            item.name.includes("Avatar")
          );
          setAvatar({
            name: avatar.name,
            url: avatar ? avatar.url : avatar.name,
          });
        } else {
          const randomSeed = () => {
            return Math.floor(Math.random() * 9999999999);
          };
          setAvatar({
            name: "Avatar",
            url: `https://api.dicebear.com/6.x/pixel-art/svg?seed=${randomSeed()}`,
          });
        }
        setProfilePics(response.data.profilePics.reverse());
      }
      if (response.data.homeBase) {
        setLocationData({
          googlePlaceId: response.data.homeBase.googlePlaceId,
          placeName: response.data.homeBase.placeName,
        });
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching profile: ", error);
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    updateMessage("");
    setFormData({
      ...formData,
      avatar: avatar,
      [e.target.name]:
        e.target.name === "useUsername" ||
        e.target.name === "useAvatar" ||
        e.target.name === "isMessageable" ||
        e.target.name === "isSearchable"
          ? e.target.checked
          : e.target.value,
    });
  };

  useEffect(() => {
    if (
      locationData.googlePlaceId !== formData.googlePlaceId ||
      locationData.placeName !== formData.placeName
    ) {
      setFormData({
        ...formData,
        googlePlaceId: locationData.googlePlaceId,
        placeName: locationData.placeName,
      });
    }
  }, [locationData]);

  useEffect(() => {
    setFormData({
      ...formData,
      googlePlaceId: locationData.googlePlaceId,
      placeName: locationData.placeName,
      profilePics: profilePics,
    });
  }, [profilePics]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setUpdatingProfile(true);
      const updatedProfile = await update(profile._id, {
        ...formData,
        avatar: avatar,
      });
      setProfile(updatedProfile.data);
      handleClose();
      setUpdatingProfile(false);
      setImagesChanged(false);
    } catch (err) {
      updateMessage(err);
    }
  };

  const {
    firstName,
    lastName,
    useUsername,
    useAvatar,
    isMessageable,
    isSearchable,
    bio,
  } = formData;

  const isFormInvalid = () => {
    return !(firstName && lastName);
  };

  if (loading) {
    return (
      <Box
        sx={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box component="form" autoComplete="off" onSubmit={handleSubmit}>
      <Grid align="center">
        <FormControlLabel
          sx={{ m: 1 }}
          control={
            <Switch
              checked={useAvatar}
              onChange={handleChange}
              name="useAvatar"
            />
          }
          label="Use Avatar"
        />
        <Grid sx={{ m: 1 }}>
          {useAvatar ? (
            <Grid sx={{ m: 2 }}>
              <AvatarRandomizer
                onChange={handleChange}
                avatar={avatar}
                setAvatar={setAvatar}
              />
            </Grid>
          ) : (
            <>
              {profilePics.length > 0 && (
                <>
                  <Card raised={true} sx={{ m: 1, maxWidth: "150px" }}>
                    {updatingProfile ? (
                      <CircularProgress size={24} /> // Display a loading indicator while updating
                    ) : (
                      <CardMedia
                        component="img"
                        sx={{
                          objectFit: "contain",
                        }}
                        image={currentProfilePicUrl}
                      />
                    )}
                  </Card>
                </>
              )}
              <Button sx={{ m: 1 }} variant="outlined" onClick={handleOpen}>
                Edit Profile Pictures
              </Button>
              <Modal
                open={open}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 450,
                    bgcolor: "background.paper",
                    border: "2px solid #000",
                    boxShadow: 24,
                    p: 4,
                  }}
                >
                  <Typography variant="h6" component="h2">
                    Editing Profile Pictures
                  </Typography>
                  {imagesChanged ? (
                    ""
                  ) : (
                    <IconButton
                      onClick={handleClose}
                      sx={{ position: "absolute", right: 8, top: 8 }}
                    >
                      <CloseIcon />
                    </IconButton>
                  )}
                  {updatingProfile ? (
                    <CircularProgress />
                  ) : (
                    <>
                      <ImageUpload
                        imageFor={"profile"}
                        id={profile._id}
                        imageListColumns={3}
                        imageListHeight={"150"}
                        imageListWidth={"400"}
                        progressBarWidth={"25.5rem"}
                        alertBoxWidth={"23.5rem"}
                        profilePics={profilePics}
                        setProfilePics={setProfilePics}
                        setImagesChanged={setImagesChanged}
                        getImageList={(imageList) => {
                          setFormData({
                            ...formData,
                            profilePicsNew: imageList.map((image) => image._id),
                          });
                        }}
                      />
                      <Button
                        onClick={handleSubmit}
                        variant="contained"
                        disabled={updatingProfile}
                        sx={{ m: 1, float: "right" }}
                      >
                        {updatingProfile ? (
                          <CircularProgress size={24} />
                        ) : (
                          "Save"
                        )}
                        {/* Display loading indicator when updating */}
                      </Button>
                    </>
                  )}
                </Box>
              </Modal>
            </>
          )}
        </Grid>
      </Grid>
      <Grid align="center">
        <TextField
          fullWidth
          name="firstName"
          autoComplete="given-name"
          label="First name"
          value={firstName}
          onChange={handleChange}
          sx={{ m: 1, width: "30ch" }}
        />
        <TextField
          fullWidth
          name="lastName"
          autoComplete="family-name"
          label="Last name"
          value={lastName}
          onChange={handleChange}
          sx={{ m: 1, width: "30ch" }}
        />
      </Grid>
      <Grid sx={{ m: 1 }} align="center">
        <PlacesAutocomplete
          locationData={locationData}
          setLocationData={setLocationData}
        />
      </Grid>
      <Grid align="center">
        <FormControlLabel
          control={
            <Switch
              checked={useUsername}
              onChange={handleChange}
              name="useUsername"
            />
          }
          label="Use Username"
        />
        <FormControlLabel
          control={
            <Switch
              checked={isMessageable}
              onChange={handleChange}
              name="isMessageable"
              color="secondary"
            />
          }
          label="Message with others"
        />
        <FormControlLabel
          control={
            <Switch
              checked={isSearchable}
              onChange={handleChange}
              name="isSearchable"
              color="warning"
            />
          }
          label="Public posts"
        />
      </Grid>
      <Grid align="center">
        <TextField
          name="bio"
          label="Bio"
          value={bio}
          onChange={handleChange}
          multiline
          rows={5}
          sx={{ m: 1, width: "60ch" }}
        />
      </Grid>
      <Grid align="center">
        <Button
          type="submit"
          variant="contained"
          disabled={isFormInvalid() || updatingProfile}
          sx={{ m: 1, width: "35ch" }}
        >
          {updatingProfile ? <CircularProgress size={24} /> : "Update"}
          {/* Display loading indicator when updating */}
        </Button>
        <Link to="/profile" style={{ textDecoration: "none" }}>
          <Button sx={{ m: 1, width: "35ch" }}>Cancel</Button>
        </Link>
      </Grid>

      {message != "" ? (
        <Alert severity="error" sx={{ m: 1, width: "70ch" }}>
          {message}
        </Alert>
      ) : (
        ""
      )}
    </Box>
  );
}

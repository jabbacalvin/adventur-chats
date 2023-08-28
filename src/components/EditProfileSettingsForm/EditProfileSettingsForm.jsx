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
  FormGroup,
  FormControlLabel,
  Switch,
  Typography,
  CircularProgress,
} from "@mui/material/";

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

  const updateMessage = (msg) => {
    setMessage(msg);
  };

  useEffect(() => {
    setLoading(true);
    fetchProfile();
  }, []);

  useEffect(() => {
    console.log(profile);
  }, [profile]);

  const fetchProfile = async () => {
    try {
      const response = await getProfile(profile._id); // Replace with your API endpoint

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
    // Check if locationData has changed
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
      });
      setProfile(updatedProfile.data);
      setUpdatingProfile(false);
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
  } = formData;

  const isFormInvalid = () => {
    return !(firstName && lastName);
  };

  if (loading) {
    return <CircularProgress />;
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
            <AvatarRandomizer
              onChange={handleChange}
              avatar={avatar}
              setAvatar={setAvatar}
            />
          ) : (
            <>
              <Typography
                sx={{ m: 1 }}
                variant="button"
                display="block"
                gutterBottom
              >
                Profile Picture Upload
              </Typography>
              <ImageUpload
                imageFor={"profile"}
                id={profile._id}
                profilePics={profilePics}
                setProfilePics={setProfilePics}
                getImageList={(imageList) => {
                  setFormData({
                    ...formData,
                    profilePicsNew: imageList.map((image) => image._id),
                  });
                }}
              />
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
          multiline
          maxRows={4}
          value={firstName}
          onChange={handleChange}
          sx={{ m: 1, width: "30ch" }}
        />
        <TextField
          fullWidth
          name="lastName"
          autoComplete="family-name"
          label="Last name"
          multiline
          maxRows={4}
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
        <Button
          type="submit"
          variant="contained"
          disabled={isFormInvalid() || updatingProfile}
          sx={{ m: 1, width: "35ch" }}
        >
          {updatingProfile ? <CircularProgress size={24} /> : "Update"}
          {/* Display loading indicator when updating */}
        </Button>
        <Link to="/" style={{ textDecoration: "none" }}>
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

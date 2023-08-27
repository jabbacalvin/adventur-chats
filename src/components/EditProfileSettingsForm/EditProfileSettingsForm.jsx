import PlacesAutocomplete from "../PlacesAutocomplete/PlacesAutocomplete";
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
} from "@mui/material/";

export default function EditProfileSettingsForm({ user }) {
  const navigate = useNavigate();
  const [message, setMessage] = useState([""]);
  const [profilePics, setProfilePics] = useState([]);
  const [hasLocation, setHasLocation] = useState(true);

  const [formData, setFormData] = useState({
    profilePic: [],
    firstName: "",
    lastName: "",
    googlePlaceId: "",
    placeName: "",
    useUsername: true,
    isMessageable: true,
    isSearchable: true,
  });

  // const [slidersState, setSlidersState] = useState({
  //   useUsername: true,
  //   isMessageable: true,
  //   isSearchable: true,
  // });

  const [locationData, setLocationData] = useState({
    googlePlaceId: "",
    placeName: "",
  });

  const updateMessage = (msg) => {
    setMessage(msg);
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await getProfile(user.profile._id); // Replace with your API endpoint

      setProfilePics(response.data.profilePics.reverse());
      setFormData(response.data);
      setLocationData({
        googlePlaceId: response.data.homeBase.googlePlaceId,
        placeName: response.data.homeBase.placeName,
      });
      // setSlidersState(response.data);
    } catch (error) {
      console.error("Error fetching profile: ", error);
    }
  };

  // const handleSliderChange = (event) => {
  //   setSlidersState({
  //     ...slidersState,
  //     [event.target.name]: event.target.checked,
  //   });
  // };

  const handleChange = (e) => {
    updateMessage("");
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.name === "useUsername" ||
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
      const updatedProfile = await update(user.profile._id, {
        userId: user._id,
        ...formData,
      });
    } catch (err) {
      updateMessage(err);
    }
  };

  const { firstName, lastName, useUsername, isMessageable, isSearchable } =
    formData;

  const isFormInvalid = () => {
    return !(firstName && lastName);
  };

  return (
    <Box component="form" autoComplete="off" onSubmit={handleSubmit}>
      <Typography sx={{ m: 1 }} variant="button" display="block" gutterBottom>
        Profile Picture Upload
      </Typography>
      <ImageUpload
        imageFor={"profile"}
        id={user.profile._id}
        profilePics={profilePics}
        setProfilePics={setProfilePics}
        getImageList={(imageList) => {
          setFormData({
            ...formData,
            profilePicsNew: imageList.map((image) => image._id),
          });
        }}
      />
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
      <Grid sx={{ m: 1 }}>
        <PlacesAutocomplete
          locationData={locationData}
          setLocationData={setLocationData}
          hasLocation={hasLocation}
          setHasLocation={setHasLocation}
        />
      </Grid>
      <Grid sx={{ m: 1, width: "28ch" }}>
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
        <FormGroup>
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
        </FormGroup>
      </Grid>
      <div>
        <Button
          type="submit"
          variant="contained"
          disabled={isFormInvalid()}
          sx={{ m: 1, width: "35ch" }}
        >
          Update
        </Button>
        <Link to="/" style={{ textDecoration: "none" }}>
          <Button sx={{ m: 1, width: "35ch" }}>Cancel</Button>
        </Link>
      </div>

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

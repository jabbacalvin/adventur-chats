import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getProfile, signUp } from "../../utilities/users-service";
import PlacesAutocomplete from "../PlacesAutocomplete/PlacesAutocomplete";
import AvatarRandomizer from "../AvatarRandomizer/AvatarRandomizer";

import {
  Box,
  Grid,
  FormControl,
  TextField,
  Button,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Alert,
} from "@mui/material/";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const SignUpForm = (props) => {
  const navigate = useNavigate();

  const randomSeed = () => {
    return Math.floor(Math.random() * 9999999999);
  };

  const [avatar, setAvatar] = useState({
    name: "Sign Up Avatar",
    url: `https://api.dicebear.com/6.x/pixel-art/svg?seed=${randomSeed()}`,
  });

  const [message, setMessage] = useState("");

  const updateMessage = (msg) => {
    setMessage(msg);
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const [showConfPassword, setShowConfPassword] = useState(false);

  const handleClickShowConfPassword = () => {
    setShowConfPassword(!showConfPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    googlePlaceId: "",
    placeName: "",
    email: "",
    password: "",
    passwordConf: "",
  });

  const [locationData, setLocationData] = useState({
    googlePlaceId: "",
    placeName: "",
  });

  const handleChange = (e) => {
    updateMessage("");
    setFormData({
      ...formData,
      avatar: avatar,
      googlePlaceId: locationData.googlePlaceId,
      placeName: locationData.placeName,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await signUp(formData);
      props.setUser(user);
      const profile = await getProfile(user);
      props.setProfile(profile.data);
      navigate(-1);
    } catch (err) {
      updateMessage(err);
    }
  };

  const { username, firstName, lastName, email, password, passwordConf } =
    formData;

  const isFormInvalid = () => {
    return !(
      username &&
      firstName &&
      lastName &&
      email &&
      password &&
      password === passwordConf
    );
  };

  return (
    <Box display="flex" justifyContent="center">
      <Box
        sx={{ textAlign: "center" }}
        component="form"
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <Grid sx={{ m: 1 }} align="center">
          <AvatarRandomizer
            onChange={handleChange}
            avatar={avatar}
            setAvatar={setAvatar}
            name={"Sign Up Avatar"}
          />
        </Grid>
        <Grid>
          <TextField
            fullWidth
            name="username"
            autoComplete="username"
            label="Username"
            value={username}
            onChange={handleChange}
            sx={{ m: 1, width: "35ch" }}
          />
        </Grid>
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
        <Grid sx={{ m: 1 }} align="center">
          <PlacesAutocomplete
            locationData={locationData}
            setLocationData={setLocationData}
          />
        </Grid>
        <Grid>
          <TextField
            fullWidth
            name="email"
            type={"email"}
            autoComplete="email"
            label="Email"
            value={email}
            onChange={handleChange}
            sx={{ m: 1, width: "50ch" }}
          />
        </Grid>
        <Grid>
          <FormControl variant="outlined" sx={{ m: 1 }}>
            <InputLabel htmlFor="outlined-password">Password</InputLabel>
            <OutlinedInput
              name="password"
              id="outlined-password"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              value={password}
              onChange={handleChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
              sx={{ width: "50ch" }}
            />
          </FormControl>
        </Grid>
        <Grid>
          <FormControl variant="outlined" sx={{ m: 1 }}>
            <InputLabel htmlFor="outlined-passwordConf">
              Password Confirmation
            </InputLabel>
            <OutlinedInput
              name="passwordConf"
              id="outlined-passwordConf"
              type={showConfPassword ? "text" : "password"}
              value={passwordConf}
              onChange={handleChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowConfPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showConfPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password Confirmation"
              sx={{ width: "50ch" }}
            />
          </FormControl>
        </Grid>
        <Grid>
          <Button
            type="submit"
            variant="contained"
            disabled={isFormInvalid()}
            sx={{ m: 1, width: "33ch" }}
            size="large"
          >
            Sign Up
          </Button>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Button sx={{ m: 1, width: "33ch" }} size="large">
              Cancel
            </Button>
          </Link>
        </Grid>
        <Grid>
          {message != "" ? (
            <Alert severity="error" sx={{ m: 1, width: "70ch" }}>
              {message}
            </Alert>
          ) : (
            ""
          )}
        </Grid>
      </Box>
    </Box>
  );
};

export default SignUpForm;

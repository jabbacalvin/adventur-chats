import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signUp } from "../../utilities/users-service";
import PlacesAutocomplete from "../PlacesAutocomplete/PlacesAutocomplete";
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

  const [message, setMessage] = useState([""]);
  const [hasLocation, setHasLocation] = useState(false);

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
      props.setProfile(user.profile);
      navigate(-1);
    } catch (err) {
      updateMessage(err.response.data.error);
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
    <Box component="form" autoComplete="off" onSubmit={handleSubmit}>
      <Grid>
        <TextField
          fullWidth
          name="username"
          autoComplete="username"
          label="Username"
          multiline
          maxRows={4}
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
          setHasLocation={setHasLocation}
        />
      </Grid>
      <Grid>
        <TextField
          fullWidth
          name="email"
          type={"email"}
          autoComplete="email"
          label="Email"
          multiline
          maxRows={4}
          value={email}
          onChange={handleChange}
          sx={{ m: 1, width: "70ch" }}
        />
      </Grid>
      <div>
        <FormControl fullWidth sx={{ width: "100%" }} variant="outlined">
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
            sx={{ m: 1, width: "50ch" }}
          />
        </FormControl>
      </div>
      <div>
        <FormControl fullWidth sx={{ width: "100%" }} variant="outlined">
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
            sx={{ m: 1, width: "50ch" }}
          />
        </FormControl>
      </div>
      <div>
        <Button
          type="submit"
          variant="contained"
          disabled={isFormInvalid()}
          sx={{ m: 1, width: "35ch" }}
        >
          Sign Up
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
};

export default SignUpForm;

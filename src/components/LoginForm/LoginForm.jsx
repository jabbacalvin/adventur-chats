import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as usersService from "../../utilities/users-service";
import {
  Box,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Button,
  Alert,
} from "@mui/material/";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export default function LoginForm({ setUser }) {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  function handleChange(evt) {
    setCredentials({ ...credentials, [evt.target.name]: evt.target.value });
    setError("");
  }

  async function handleSubmit(evt) {
    // Prevent form from being submitted to the server
    evt.preventDefault();
    try {
      // The promise returned by the signUp service method
      // will resolve to the user object included in the
      // payload of the JSON Web Token (JWT)
      const user = await usersService.login(credentials);
      setUser(user);
      navigate(-1);
    } catch {
      setError("Log In Failed - Try Again");
    }
  }

  return (
    <>
      <Box display="flex" justifyContent="center">
        <Box
          sx={{ textAlign: "center" }}
          component="form"
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <Grid>
            <TextField
              fullWidth
              name="email"
              type={"email"}
              autoComplete="email"
              label="Email"
              value={credentials.email}
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
                autoComplete="current-password"
                value={credentials.password}
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
            <Button
              type="submit"
              variant="contained"
              sx={{ m: 1, width: "53ch" }}
              size="large"
            >
              Sign In
            </Button>
          </Grid>
          <Grid>
            {error != "" ? <Alert severity="error">{error}</Alert> : ""}
          </Grid>
        </Box>
      </Box>
    </>
  );
}

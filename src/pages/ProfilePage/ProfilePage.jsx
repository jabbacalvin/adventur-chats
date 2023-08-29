

import React from "react";
import ProfileDetails from "../../components/ProfileDetails/ProfileDetails";
import PostContainer from "../../components/PostContainer/PostContainer";
import { Box, Grid, Paper, Typography } from "@mui/material";

const backgroundStyles = {
  backgroundImage: `url('https://cdn.wallpapersafari.com/65/60/TSz8Ep.jpg')`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  backdropFilter: "blur(5px)",
  minHeight: "100vh",
};

export default function ProfilePage({
  updatingProfile,
  setUpdatingProfile,
  profile,
  setProfile,
}) {
  return (
    <Box sx={{ ...backgroundStyles, p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Profile
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={9}>
          <PostContainer profile={profile} profileId={profile._id} />
        </Grid>
        <Grid item xs={3} sx={{ p: 8 }}>
          <Paper sx={{ p: 2 }}>
            <ProfileDetails
              updatingProfile={updatingProfile}
              setUpdatingProfile={setUpdatingProfile}
              profile={profile}
              setProfile={setProfile}
            />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}


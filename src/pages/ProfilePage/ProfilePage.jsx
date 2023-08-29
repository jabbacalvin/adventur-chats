import ProfileDetails from "../../components/ProfileDetails/ProfileDetails";
import PostContainer from "../../components/PostContainer/PostContainer";
import { Box, Grid, Paper } from "@mui/material/";

export default function ProfilePage({
  updatingProfile,
  setUpdatingProfile,
  profile,
  setProfile,
}) {
  return (
    <>
      <h1>Profile</h1>
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
    </>
  );
}

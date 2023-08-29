import {
  Box,
  Grid,
  Paper,
  Typography,
  Avatar,
  Card,
  CardMedia,
} from "@mui/material/";

export default function ProfilePage({
  updatingProfile,
  setUpdatingProfile,
  profile,
  setProfile,
}) {
  return (
    <>
      <Typography variant="h3" gutterBottom align="center">
        {profile.useUsername
          ? profile.username
          : `${profile.firstName} ${profile.lastName}`}
      </Typography>
      <Card raised={true} sx={{ borderRadius: "50%" }}>
        <CardMedia
          component="img"
          alt={`${profile.firstName} ${profile.lastName}`}
          image={profile.profilePics[0].url}
        />
      </Card>
    </>
  );
}

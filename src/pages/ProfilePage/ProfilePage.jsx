

// import React from "react";
// import ProfileDetails from "../../components/ProfileDetails/ProfileDetails";
// import PostContainer from "../../components/PostContainer/PostContainer";
// import { Box, Grid, Paper, Typography } from "@mui/material";

// const backgroundStyles = {
//   backgroundImage: `url('https://cdn.wallpapersafari.com/65/60/TSz8Ep.jpg')`,
//   backgroundSize: "cover",
//   backgroundPosition: "center",
//   backdropFilter: "blur(5px)",
//   minHeight: "100vh",
//   display: "flex",
//   flexDirection: "column",
//   justifyContent: "center",
//   alignItems: "center",
// };

// export default function ProfilePage({
//   updatingProfile,
//   setUpdatingProfile,
//   profile,
//   setProfile,
// }) {
//   return (
//     <Box sx={{ ...backgroundStyles, p: 3 }}>
//       <Typography variant="h4" gutterBottom>
//         Profile
//       </Typography>
//       <Grid container spacing={2}>
//         <Grid item xs={9}>
//           <PostContainer profile={profile} profileId={profile._id} />
//         </Grid>
//         <Grid item xs={3} sx={{ p: 8 }}>
//           <Paper sx={{ p: 2 }}>
//             <ProfileDetails
//               updatingProfile={updatingProfile}
//               setUpdatingProfile={setUpdatingProfile}
//               profile={profile}
//               setProfile={setProfile}
//             />
//           </Paper>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// }



import React from "react";
import ProfileDetails from "../../components/ProfileDetails/ProfileDetails";
import PostContainer from "../../components/PostContainer/PostContainer";
import { Box, Grid, Paper, Typography } from "@mui/material";

const backgroundStyles = {
  backgroundImage: `url('https://wallpaperaccess.com/full/1287373.jpg')`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  backdropFilter: "blur(5px)", // Adding blur effect
  minHeight: "100vh", // Ensures the background covers the entire viewport
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
};

const profileHeadingStyles = {
  fontWeight: "bold",
  color: "white",
  marginBottom: "20px",
};

export default function ProfilePage({
  updatingProfile,
  setUpdatingProfile,
  profile,
  setProfile,
}) {
  return (
    <Box sx={{ ...backgroundStyles, p: 3 }}>
      <Typography variant="h2" gutterBottom style={profileHeadingStyles}>
        Profile
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={9}>
          <PostContainer profile={profile} profileId={profile._id} />
        </Grid>
        <Grid item xs={3}>
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


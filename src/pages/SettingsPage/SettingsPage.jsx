import { Box } from "@mui/system";
import { Paper } from "@mui/material";
import EditProfileSettingsForm from "../../components/EditProfileSettingsForm/EditProfileSettingsForm";

const backgroundStyles = {
  backgroundImage: `url('https://images.rawpixel.com/image_500/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvdjk5Ni0wMDlfMS1rcm9pcjRkay5qcGc.jpg')`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  backdropFilter: "blur(15px)",
  minHeight: "75vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
};

const contentContainerStyles = {
  padding: "20px",
  border: "2px solid black",
};

export default function SettingsPage({
  updatingProfile,
  setUpdatingProfile,
  profile,
  setProfile,
}) {
  return (
    <Box sx={{ ...backgroundStyles, p: 3 }}>
      <Paper sx={contentContainerStyles}>
        <EditProfileSettingsForm
          updatingProfile={updatingProfile}
          setUpdatingProfile={setUpdatingProfile}
          profile={profile}
          setProfile={setProfile}
        />
      </Paper>
    </Box>
  );
}

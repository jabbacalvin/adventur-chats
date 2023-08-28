import EditProfileSettingsForm from "../../components/EditProfileSettingsForm/EditProfileSettingsForm";
import {
  FormGroup,
  FormControlLabel,
  Box,
  TextField,
  Switch,
  Button,
} from "@mui/material";

export default function SettingsPage({
  updatingProfile,
  setUpdatingProfile,
  profile,
  setProfile,
}) {
  return (
    <>
      <h1>Settings</h1>
      <EditProfileSettingsForm
        updatingProfile={updatingProfile}
        setUpdatingProfile={setUpdatingProfile}
        profile={profile}
        setProfile={setProfile}
      />
    </>
  );
}

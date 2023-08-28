import EditProfileSettingsForm from "../../components/EditProfileSettingsForm/EditProfileSettingsForm";
import {
  FormGroup,
  FormControlLabel,
  Box,
  TextField,
  Switch,
  Button,
} from "@mui/material";

export default function SettingsPage({ profile }) {
  return (
    <>
      <h1>Settings</h1>
      <EditProfileSettingsForm profile={profile} />
    </>
  );
}

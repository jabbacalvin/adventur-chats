import EditProfileSettingsForm from "../../components/EditProfileSettingsForm/EditProfileSettingsForm";

export default function SettingsPage({
  updatingProfile,
  setUpdatingProfile,
  profile,
  setProfile,
}) {
  return (
    <>
      <EditProfileSettingsForm
        updatingProfile={updatingProfile}
        setUpdatingProfile={setUpdatingProfile}
        profile={profile}
        setProfile={setProfile}
      />
    </>
  );
}

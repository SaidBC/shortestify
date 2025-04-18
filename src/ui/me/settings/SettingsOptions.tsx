import {
  faEnvelope,
  faKey,
  faTrash,
  faUserEdit,
} from "@fortawesome/free-solid-svg-icons";
import SettingsOptionButton from "./SettingsOptionLink";

export default function SettingsOptions() {
  return (
    <div className="flex flex-col gap-4">
      <SettingsOptionButton
        to="/me/settings/username"
        icon={faUserEdit}
        title="Change Username"
        description="Click here to update your username"
      />
      <SettingsOptionButton
        to="/me/settings/email"
        icon={faEnvelope}
        title="Change Email"
        description="Click here to update your email"
      />
      <SettingsOptionButton
        to="/me/settings/password"
        icon={faKey}
        title="Change Password"
        description="Click here to update your password"
      />
      <SettingsOptionButton
        to="/me/settings/delete"
        icon={faTrash}
        title="Delete Account"
        description="Click here to delete your account"
      />
    </div>
  );
}

import ProfileInfo from '../info/_Components/ProfileInfo';
import ChangePassword from '../info/_Components/ChangePassword';

function SettingsPage() {
  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900">Account Settings</h2>
        <p className="mt-1 text-sm text-gray-500">
          Update your profile information and change your password
        </p>
      </div>
      <ProfileInfo />
      <ChangePassword />
    </div>
  );
}

export default SettingsPage;

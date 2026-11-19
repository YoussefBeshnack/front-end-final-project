import { redirect } from 'next/navigation';

function ProfilePage() {
  redirect('/profile/settings');
}

export default ProfilePage;

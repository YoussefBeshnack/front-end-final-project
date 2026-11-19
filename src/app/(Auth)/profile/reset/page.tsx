import { redirect } from 'next/navigation';

function ResetPage() {
  redirect('/profile/settings');
}

export default ResetPage;

import { redirect } from 'next/navigation';

function InfoPage() {
  redirect('/profile/settings');
}

export default InfoPage;

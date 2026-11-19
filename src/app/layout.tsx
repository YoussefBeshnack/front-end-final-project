
import { Exo } from 'next/font/google';
import './globals.css';
import Navbar from '@components/Navbar/Navbar';
import ProgressBar from '@components/Nprogress/Nprogress';
import Footer from '@components/Footer/Footer';

import Providers from '../context/Providers';

const exo = Exo({
  variable: '--font-exo',
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${exo.variable} antialiased`}>
        <Providers>
          <ProgressBar />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}

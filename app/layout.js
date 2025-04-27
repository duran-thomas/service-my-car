import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css';
import localFont from 'next/font/local';
import Navigation from '@/components/Navbar/Navigation';

import { Inter, Roboto_Mono } from 'next/font/google';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

const robotoMono = Roboto_Mono({
  variable: '--font-roboto-mono',
  subsets: ['latin'],
});


export const metadata = {
  title: 'My App',
  description: 'Using Geist fonts',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${robotoMono.variable}`}>
      <Navigation />
      <body>{children}</body>
    </html>
  );
}

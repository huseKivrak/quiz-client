import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { AuthProvider } from '@/contexts/AuthContext';
import NavBar from '@/components/UI/NavBar';
import Footer from '@/components/UI/Footer';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'quiz',
  description: 'quiz app description',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={`${inter.className} flex min-h-screen flex-col items-center justify-between`}>
        <AuthProvider>
          <NavBar />
          {children}
        </AuthProvider>
        <Footer />
      </body>
    </html>
  );
}

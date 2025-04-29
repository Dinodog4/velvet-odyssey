import AnalyticsProvider from '@/components/analytics/AnalyticsProvider';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Chatbot from '@/components/features/Chatbot';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Velvet Odyssey - Luxury Adult Cruises',
  description: 'Experience luxury cruises designed for adults seeking adventure, relaxation, and unforgettable experiences.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AnalyticsProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <Chatbot />
        </AnalyticsProvider>
      </body>
    </html>
  );
}

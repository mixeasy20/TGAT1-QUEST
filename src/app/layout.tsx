import type { Metadata } from 'next';
import { Kanit } from 'next/font/google';
import './globals.css';
import { AppLayout } from '@/components/AppLayout';

const kanit = Kanit({
  weight: ['300', '400', '500', '600', '700', '800'],
  subsets: ['thai', 'latin'],
  display: 'swap',
  variable: '--font-kanit',
});

export const metadata: Metadata = {
  title: 'TGAT1 Quest — เตรียมสอบการสื่อสารภาษาอังกฤษแบบ Gamified',
  description:
    'เว็บแอปฝึกทำข้อสอบ TGAT1 ภาษาอังกฤษ พร้อมระบบ Spaced Repetition Flashcards, Exam & Story Mode และ Mistake Analysis เพื่อการเตรียมตัวสอบอย่างมั่นใจ',
  manifest: '/manifest.json',
  themeColor: '#4f46e5',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'TGAT1 Quest',
  },
  icons: {
    icon: [
      { url: '/favicon-round.jpg', sizes: 'any' },
    ],
    shortcut: '/favicon-round.jpg',
    apple: '/app-logo.jpg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th" className={`${kanit.variable} h-full antialiased dark`}>
      <body className={`${kanit.className} min-h-full bg-slate-950 text-slate-100 flex flex-col`}>
        <AppLayout>{children}</AppLayout>
      </body>
    </html>
  );
}

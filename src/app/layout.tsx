import type { Metadata } from 'next';
import './globals.css';
import { AppLayout } from '@/components/AppLayout';

export const metadata: Metadata = {
  title: 'TGAT1 Quest — เตรียมสอบการสื่อสารภาษาอังกฤษแบบ Gamified',
  description:
    'เว็บแอปฝึกทำข้อสอบ TGAT1 ภาษาอังกฤษ พร้อมระบบ Spaced Repetition Flashcards, Exam & Story Mode และ Mistake Analysis เพื่อการเตรียมตัวสอบอย่างมั่นใจ',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th" className="h-full antialiased dark">
      <body className="min-h-full bg-slate-950 text-slate-100 flex flex-col">
        <AppLayout>{children}</AppLayout>
      </body>
    </html>
  );
}

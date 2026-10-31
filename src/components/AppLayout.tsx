'use client';

import React, { ReactNode, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import { UserProvider } from '@/context/UserContext';
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { FloatingPillNavbar } from '@/components/FloatingPillNavbar';
import { MobileAddWordFAB } from '@/components/MobileAddWordFAB';

function ProtectedLayout({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  const isLoginPage = pathname === '/login' || pathname === '/forgot-password';
  const isVocabPage = pathname === '/vocab';
  const isGuest = Boolean(user?.isAnonymous);

  useEffect(() => {
    if (!loading) {
      if (!user && !isLoginPage) {
        router.replace('/login');
      } else if (user && isLoginPage) {
        router.replace(isGuest ? '/vocab' : '/');
      } else if (isGuest && !isVocabPage && !isLoginPage) {
        router.replace('/vocab');
      }
    }
  }, [user, loading, isLoginPage, isVocabPage, isGuest, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center text-slate-700 select-none">
        <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-xl shadow-indigo-500/10 border border-slate-200 mb-4 animate-bounce">
          <img src="/app-logo.jpg" alt="TGAT1 Quest Logo" className="w-full h-full object-cover" />
        </div>
        <h2 className="text-base font-bold text-slate-800 tracking-tight">TGAT1 Quest</h2>
        <p className="text-xs text-slate-500 mt-1 font-medium">กำลังเตรียมพร้อมระบบการเรียนรู้...</p>
      </div>
    );
  }

  // If on login/forgot-password page, display clean full screen view
  if (isLoginPage) {
    return (
      <div className="min-h-screen bg-slate-50/70 text-slate-800 flex flex-col">
        {children}
      </div>
    );
  }

  // If not logged in yet and redirecting, render minimal loader
  if (!user) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center text-slate-500 text-xs">
        กำลังนำทางไปหน้าเข้าสู่ระบบ...
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-50/60 text-slate-800 font-sans selection:bg-indigo-100 selection:text-indigo-800">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 pb-28 lg:pb-0">
        <Header />
        <main className="flex-1 p-3.5 sm:p-5 md:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
      {/* Mobile Floating Action Button (Add Word) */}
      <MobileAddWordFAB />
      {/* Mobile Floating Pill Bottom Navbar */}
      <FloatingPillNavbar />
    </div>
  );
}

export function AppLayout({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <UserProvider>
        <ProtectedLayout>{children}</ProtectedLayout>
      </UserProvider>
    </AuthProvider>
  );
}

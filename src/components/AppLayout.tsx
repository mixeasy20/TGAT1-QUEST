'use client';

import React, { ReactNode, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import { UserProvider } from '@/context/UserContext';
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';

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
        // Not logged in -> must enter login page first
        router.replace('/login');
      } else if (user && isLoginPage) {
        // Already logged in and currently on /login -> go to destination
        router.replace(isGuest ? '/vocab' : '/');
      } else if (isGuest && !isVocabPage && !isLoginPage) {
        // Guest user is strictly restricted to /vocab only
        router.replace('/vocab');
      }
    }
  }, [user, loading, isLoginPage, isVocabPage, isGuest, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white select-none">
        <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-2xl shadow-indigo-600/30 border border-indigo-500/40 mb-4 animate-bounce">
          <img src="/app-logo.jpg" alt="TGAT1 Quest Logo" className="w-full h-full object-cover" />
        </div>
        <h2 className="text-base font-bold text-white tracking-tight">TGAT1 Quest</h2>
        <p className="text-xs text-slate-400 mt-1 font-medium">กำลังเตรียมพร้อมระบบการเรียนรู้...</p>
      </div>
    );
  }

  // If on login page, display clean full screen view
  if (isLoginPage) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
        {children}
      </div>
    );
  }

  // If not logged in yet and redirecting, render minimal loader
  if (!user) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-400 text-xs">
        กำลังนำทางไปหน้าเข้าสู่ระบบ...
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500 selection:text-white">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Header />
        <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
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

'use client';

import React, { ReactNode } from 'react';
import { AuthProvider } from '@/context/AuthContext';
import { UserProvider } from '@/context/UserContext';
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';

export function AppLayout({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <UserProvider>
        <div className="flex min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500 selection:text-white">
          <Sidebar />
          <div className="flex-1 flex flex-col min-w-0">
            <Header />
            <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-7xl w-full mx-auto">
              {children}
            </main>
          </div>
        </div>
      </UserProvider>
    </AuthProvider>
  );
}

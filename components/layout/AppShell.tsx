'use client';

import { useState } from 'react';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import MobileNav from '../layout/MobileNav';

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <>
      <Header onOpenMobileNav={() => setMobileNavOpen(true)} />
      <MobileNav isOpen={mobileNavOpen} onClose={() => setMobileNavOpen(false)} />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
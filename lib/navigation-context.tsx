// lib/navigation-context.tsx
'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

type NavigationContextType = {
  isNavigating: boolean;
  startNavigating: () => void;
};

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export function NavigationProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isNavigating, setIsNavigating] = useState(false);

  // Whenever the actual route finishes changing, clear the loading state
  useEffect(() => {
    setIsNavigating(false);
  }, [pathname, searchParams]);

  const startNavigating = () => setIsNavigating(true);

  return (
    <NavigationContext.Provider value={{ isNavigating, startNavigating }}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const context = useContext(NavigationContext);
  if (!context) throw new Error('useNavigation must be used within a NavigationProvider');
  return context;
}
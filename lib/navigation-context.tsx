'use client';

import { createContext, useContext, useState, useEffect, ReactNode, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

type NavigationContextType = {
  isNavigating: boolean;
  startNavigating: () => void;
};

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

// Isolated component that actually reads the search params.
// Wrapped in Suspense below so it doesn't force the whole tree
// (including /_not-found) to bail out of static rendering.
function RouteChangeListener({ onRouteChange }: { onRouteChange: () => void }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    onRouteChange();
  }, [pathname, searchParams, onRouteChange]);

  return null;
}

export function NavigationProvider({ children }: { children: ReactNode }) {
  const [isNavigating, setIsNavigating] = useState(false);

  const startNavigating = () => setIsNavigating(true);
  const clearNavigating = () => setIsNavigating(false);

  return (
    <NavigationContext.Provider value={{ isNavigating, startNavigating }}>
      <Suspense fallback={null}>
        <RouteChangeListener onRouteChange={clearNavigating} />
      </Suspense>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const context = useContext(NavigationContext);
  if (!context) throw new Error('useNavigation must be used within a NavigationProvider');
  return context;
}
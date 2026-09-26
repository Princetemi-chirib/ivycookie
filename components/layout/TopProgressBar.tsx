// components/layout/TopProgressBar.tsx
'use client';

import { useEffect, useState } from 'react';
import { useNavigation } from '@/lib/navigation-context';

export default function TopProgressBar() {
  const { isNavigating } = useNavigation();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

    if (isNavigating) {
      setVisible(true);
      setProgress(15);
      interval = setInterval(() => {
        setProgress((prev) => (prev < 85 ? prev + (85 - prev) * 0.15 : prev));
      }, 150);
    } else if (visible) {
      // finish the bar, then fade it out
      setProgress(100);
      const timeout = setTimeout(() => {
        setVisible(false);
        setProgress(0);
      }, 300);
      return () => clearTimeout(timeout);
    }

    return () => clearInterval(interval);
  }, [isNavigating]);

  if (!visible) return null;

  return (
    <div className="fixed left-0 top-0 z-[100] h-[3px] w-full bg-transparent">
      <div
        className="h-full bg-primary-500 shadow-[0_0_8px_rgba(236,72,153,0.6)] transition-all duration-300 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
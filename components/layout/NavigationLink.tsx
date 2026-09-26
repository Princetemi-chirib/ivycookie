// components/layout/NavigationLink.tsx
'use client';

import Link, { LinkProps } from 'next/link';
import { usePathname } from 'next/navigation';
import { useNavigation } from '@/lib/navigation-context';
import { ReactNode, MouseEvent } from 'react';

type NavigationLinkProps = LinkProps & {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  'aria-label'?: string;
};

export default function NavigationLink({ href, children, onClick, ...props }: NavigationLinkProps) {
  const { startNavigating } = useNavigation();
  const pathname = usePathname();

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    const targetPath = typeof href === 'string' ? href : href.pathname;
    // Only show the bar if we're actually navigating somewhere new
    if (targetPath && targetPath !== pathname) {
      startNavigating();
    }
    onClick?.();
  };

  return (
    <Link href={href} onClick={handleClick} {...props}>
      {children}
    </Link>
  );
}
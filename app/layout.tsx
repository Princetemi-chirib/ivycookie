// app/layout.tsx
import './globals.css';
import { Fredoka, Inter } from 'next/font/google';
import AppShell from '@/components/layout/AppShell';
import { CartProvider } from '@/lib/cart-context';

const fredoka = Fredoka({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-fredoka',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata = {
  title: 'Ivy Cookiecare.ng',
  description: '...helping you marinate your cookie',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${fredoka.variable} ${inter.variable}`}>
      <body className="flex min-h-screen flex-col bg-white text-gray-900 antialiased">
        <CartProvider>
          <AppShell>{children}</AppShell>
        </CartProvider>
      </body>
    </html>
  );
}
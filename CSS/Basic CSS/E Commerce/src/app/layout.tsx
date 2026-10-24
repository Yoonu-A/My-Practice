import type { Metadata } from 'next';
import './globals.css';
import { ToastProvider } from '@/context/ToastContext';
import { AuthProvider } from '@/context/AuthContext';
import { WishlistProvider } from '@/context/WishlistContext';
import { CartProvider } from '@/context/CartContext';
import TopAnnouncementBar from '@/components/layout/TopAnnouncementBar';
import Navbar from '@/components/layout/Navbar';
import CartDrawer from '@/components/cart/CartDrawer';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'NEXORA STORE | Sri Lanka Premium Online Shopping Platform',
  description: 'Shop authentic electronics, flagship smartphones, luxury watches, sneakers and designer fashion with Island-wide Cash on Delivery across all 25 districts in Sri Lanka.',
  keywords: [
    'Nexora Store',
    'Online Shopping Sri Lanka',
    'Smartphones Sri Lanka',
    'Electronics Colombo',
    'Watches Sri Lanka',
    'Cash on Delivery Sri Lanka',
    'LKR Prices',
  ],
  authors: [{ name: 'NEXORA STORE Sri Lanka' }],
  openGraph: {
    title: 'NEXORA STORE | Premium E-Commerce Platform Sri Lanka',
    description: 'Island-wide fast delivery, 100% genuine products, and Cash on Delivery in Sri Lankan Rupees (LKR).',
    type: 'website',
    locale: 'en_LK',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-electric-500 selection:text-white">
        <ToastProvider>
          <AuthProvider>
            <WishlistProvider>
              <CartProvider>
                <TopAnnouncementBar />
                <Navbar />
                <main className="flex-1">
                  {children}
                </main>
                <CartDrawer />
                <Footer />
              </CartProvider>
            </WishlistProvider>
          </AuthProvider>
        </ToastProvider>
      </body>
    </html>
  );
}

import './globals.css';
import Link from 'next/link';

export const metadata = {
  title: 'HealthX Africa',
  description: 'Health information portal for Africa',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <header className="p-4 border-b border-gray-300">
          <nav className="flex space-x-4">
            <Link href="/" className="hover:underline">Home</Link>
            <Link href="/about" className="hover:underline">About</Link>
            <Link href="/contact" className="hover:underline">Contact</Link>
          </nav>
        </header>

        <main className="flex-grow p-6">
          {children}
        </main>

        <footer className="p-4 border-t border-gray-300 text-center text-sm text-gray-600">
          © 2025 HealthX Africa. All rights reserved.
        </footer>
      </body>
    </html>
  );
}
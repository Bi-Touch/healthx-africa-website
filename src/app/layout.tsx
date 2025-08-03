// /src/app/layout.tsx
import './globals.css';
import Link from 'next/link';

export const metadata = {
  title: 'HealthX Africa',
  description: 'Health information portal for Africa',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="p-4 border-b border-gray-300">
  <nav className="flex space-x-4">
    <Link href="/" className="hover:underline">Home</Link>
    <Link href="/about" className="hover:underline">About</Link>
    <Link href="/contact" className="hover:underline">Contact</Link>
  </nav>
</header>

        <main style={{ padding: '1rem' }}>{children}</main>

        <footer style={{ padding: '1rem', borderTop: '1px solid #ccc', marginTop: 'auto', textAlign: 'center' }}>
          <p>© 2025 HealthX Africa. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}
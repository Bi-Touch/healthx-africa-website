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
        {/* Header */}
        <header className="border-b border-gray-300 bg-white">
          <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              
              {/* Left - Logo */}
              <div className="flex-shrink-0">
                <Link href="/">
                  <img
                    src="/logo.png"
                    alt="HealthX Africa"
                    className="h-8 w-auto"
                  />
                </Link>
              </div>

              {/* Center - Menu */}
              <div className="hidden md:flex flex-1 justify-center space-x-8">
                <Link href="/" className="text-gray-700 hover:text-blue-600">Home</Link>
                <Link href="/about" className="text-gray-700 hover:text-blue-600">About</Link>
                <Link href="/contact" className="text-gray-700 hover:text-blue-600">Contact</Link>
              </div>

              {/* Right - Optional icons/buttons */}
              <div className="hidden md:flex items-center space-x-4">
                {/* Example: Login Button */}
                <Link
                  href="/login"
                  className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                  Login
                </Link>
              </div>

              {/* Mobile Menu Button */}
              <div className="md:hidden flex items-center">
                <button
                  type="button"
                  className="text-gray-700 hover:text-blue-600 focus:outline-none"
                  aria-label="Toggle menu"
                >
                  {/* Simple hamburger icon */}
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </nav>
        </header>

        {/* Main Content */}
        <main className="flex-grow p-0">{children}</main>

        {/* Footer */}
        <footer className="p-4 border-t border-gray-300 text-center text-sm text-gray-600">
          © 2025 HealthX Africa. All rights reserved.
        </footer>
      </body>
    </html>
  );
}
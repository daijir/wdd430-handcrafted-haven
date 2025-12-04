import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Handcrafted Haven",
  description: "A marketplace for handcrafted items",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 text-gray-900`}
      >
        {/* Navbar */}
        <header className="bg-white shadow-sm">
          <nav className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="text-xl font-bold text-indigo-600">
              Handcrafted Haven
            </Link>

            {/* Navigation Links */}
            <div className="flex items-center gap-6">
              <Link
                href="/products"
                className="text-gray-700 hover:text-indigo-600"
              >
                Products
              </Link>

              <Link
                href="/seller/profile"
                className="text-gray-700 hover:text-indigo-600 font-medium"
              >
                My Seller Profile
              </Link>
            </div>
          </nav>
        </header>

        {/* Main Content */}
        <main className="max-w-6xl mx-auto px-4 py-8">{children}</main>
      </body>
    </html>
  );
}

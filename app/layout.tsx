import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from './components/Navbar'
import { NextAuthProvider } from './components/Providers'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lost-Found",
  description: "Platform for finding your lost items",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">

      <body className={inter.className}>
        <NextAuthProvider>
         <div className="bg-gray-100 min-h-screen bg-repeat-y">
            <Navbar />
            {children}
            </div>
        </NextAuthProvider>
      </body>
    </html>
  );
}

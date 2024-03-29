import type { Metadata } from "next";
import { Righteous } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar";

const righteous = Righteous({  weight: '400',
  subsets: ['latin'],});

export const metadata: Metadata = {
  title: "Inplay",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={righteous.className}>
        {children}
      </body>
    </html>
  );
}

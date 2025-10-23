import type React from "react";
import type { Metadata } from "next";
// import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
  title: "shad-chain",
  description: "Select and install shadcn components with a single command",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        {children}
        {/*<Analytics />*/}
      </body>
    </html>
  );
}

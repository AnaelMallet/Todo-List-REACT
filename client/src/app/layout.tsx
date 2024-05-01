import type { Metadata } from "next"

import "./globals.css"

export const metadata: Metadata = {
  title: "Todo-list-REACT"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="h-screen bg-gray-100">{children}</body>
    </html>
  );
}

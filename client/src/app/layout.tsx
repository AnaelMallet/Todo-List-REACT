import type { Metadata } from "next"

import "./globals.css"
import { Providers } from "./page"

export const metadata: Metadata = {
  title: "Todo-list-REACT"
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {

  return (
    <html lang="en">
        <body className="bg-gray-100 overflow-hidden">
          <Providers>{children}</Providers>
        </body>
    </html>
  )
}

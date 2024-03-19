import type { Metadata } from "next"
import { Inter } from "next/font/google"

import { Providers } from "./providers"

import "./globals.css"

import "@glideapps/glide-data-grid/dist/index.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Price Simulator",
  description: "Created by Keldan",
  icons: [
    {
      url: "/pricesimulator.ico",
      href: "/pricesimulator.ico",
      rel: "icon",
      type: "image/x-icon",
    },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="keldan">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}

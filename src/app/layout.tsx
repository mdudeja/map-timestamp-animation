import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "The signatures as they came: time and location",
  description: "SC Judgment on #MarriageEquality #LGBTQIA",
  icons: ["/images/icon.ico", "/images/icon.png"],
  openGraph: {
    images: [
      {
        url: "/images/icon.png",
        width: 200,
        height: 200,
        alt: "The signatures as they came: time and location",
      },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}

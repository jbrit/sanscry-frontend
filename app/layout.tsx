import type React from "react"
import "@/app/globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { PriceProvider } from "@/lib/price-context"

export const metadata = {
  title: "Sanscry Dashboard",
  description: "Analytics dashboard for monitoring sandwich attacks on blockchain networks",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <PriceProvider>{children}</PriceProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

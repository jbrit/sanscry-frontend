"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface PriceContextType {
  currency: "SOL" | "USD"
  solPrice: number
  toggleCurrency: () => void
  formatValue: (value: number) => string
}

const PriceContext = createContext<PriceContextType>({
  currency: "SOL",
  solPrice: 150,
  toggleCurrency: () => {},
  formatValue: (value) => `${value.toFixed(2)} SOL`,
})

export function PriceProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrency] = useState<"SOL" | "USD">("SOL")
  const solPrice = 150 // Default SOL price in USD

  const toggleCurrency = () => {
    setCurrency((prev) => (prev === "SOL" ? "USD" : "SOL"))
  }

  const formatValue = (value: number): string => {
    if (currency === "SOL") {
      return `${value.toFixed(4)} SOL`
    } else {
      const usdValue = value * solPrice
      return `$${usdValue.toFixed(2)}`
    }
  }

  return (
    <PriceContext.Provider value={{ currency, solPrice, toggleCurrency, formatValue }}>
      {children}
    </PriceContext.Provider>
  )
}

export const usePrice = () => useContext(PriceContext)

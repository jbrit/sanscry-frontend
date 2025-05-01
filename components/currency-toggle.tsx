"use client"

import { usePrice } from "@/lib/price-context"
import { Button } from "@/components/ui/button"
import { CircleDollarSign } from "lucide-react"

interface CurrencyToggleProps {
  className?: string
}

export function CurrencyToggle({ className }: CurrencyToggleProps) {
  const { currency, toggleCurrency } = usePrice()

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleCurrency}
      className={`flex items-center gap-2 ${className || ""}`}
    >
      <CircleDollarSign className="h-4 w-4" />
      {currency === "SOL" ? "SOL" : "USD"}
    </Button>
  )
}

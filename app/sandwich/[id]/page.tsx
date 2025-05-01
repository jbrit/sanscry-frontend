import { SandwichDetail } from "@/components/sandwich-detail"
import { DataProvider } from "@/components/data-provider"
import { PriceProvider } from "@/lib/price-context"

export default function SandwichDetailPage({ params }: { params: { id: string } }) {
  return (
    <DataProvider>
      <PriceProvider>
        <SandwichDetail sandwichId={params.id} />
      </PriceProvider>
    </DataProvider>
  )
}

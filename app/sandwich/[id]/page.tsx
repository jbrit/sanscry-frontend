import { SandwichDetail } from "@/components/sandwich-detail"

export default function SandwichDetailPage({ params }: { params: { id: string } }) {
  return <SandwichDetail sandwichId={params.id} />
}

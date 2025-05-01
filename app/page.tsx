import { Dashboard } from "@/components/dashboard"
import { DataProvider } from "@/components/data-provider"

export default function Home() {
  return (
    <DataProvider>
      <Dashboard />
    </DataProvider>
  )
}

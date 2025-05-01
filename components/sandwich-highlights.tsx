"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SortableTable } from "@/components/ui/sortable-table"
import { Button } from "@/components/ui/button"
import { usePrice } from "@/lib/price-context"
import { formatDexName, formatPoolAddress } from "@/lib/dex-mapping"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Clock, Eye } from "lucide-react"
import Link from "next/link"

interface SandwichHighlight {
  sandwich_id: string
  profit: number
  block: number
  block_time: number
  dex: string
  pool: string
  bot: string
  attacker: string
}

interface HighlightsData {
  most_profitable_sandwiches: SandwichHighlight[]
  latest_sandwiches: SandwichHighlight[]
}

export function SandwichHighlights() {
  const [data, setData] = useState<HighlightsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)
  const { formatValue } = usePrice()

  const fetchHighlights = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/highlights", {
        cache: "no-store",
      })

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`)
      }

      const result = await response.json()
      setData(result)
      setLastUpdated(new Date())
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to fetch highlights"))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchHighlights()

    // Set up polling every 10 seconds
    const intervalId = setInterval(fetchHighlights, 10000)

    return () => clearInterval(intervalId)
  }, [])

  const columns = [
    {
      key: "sandwich_id",
      header: "ID",
      cell: (item: SandwichHighlight) => item.sandwich_id.slice(0, 8) + "...",
    },
    {
      key: "profit",
      header: "Profit",
      cell: (item: SandwichHighlight) => formatValue(item.profit),
      sortable: true,
      sortKey: "profit" as keyof SandwichHighlight,
    },
    {
      key: "block",
      header: "Block",
      cell: (item: SandwichHighlight) => item.block,
      sortable: true,
      sortKey: "block" as keyof SandwichHighlight,
    },
    {
      key: "dex",
      header: "DEX",
      cell: (item: SandwichHighlight) => formatDexName(item.dex),
    },
    {
      key: "pool",
      header: "Pool",
      cell: (item: SandwichHighlight) => formatPoolAddress(item.pool),
    },
    {
      key: "time",
      header: "Time",
      cell: (item: SandwichHighlight) => new Date(item.block_time * 1000).toLocaleString(),
      sortable: true,
      sortKey: "block_time" as keyof SandwichHighlight,
    },
    {
      key: "actions",
      header: "Actions",
      cell: (item: SandwichHighlight) => (
        <Link href={`/sandwich/${item.sandwich_id}`} className="text-blue-500 hover:underline flex items-center gap-1">
          <Eye className="h-4 w-4 mr-1" />
          View Details
        </Link>
      ),
    },
  ]

  const latestBlock = data?.latest_sandwiches[0]?.block || 0
  const latestBlockTime = data?.latest_sandwiches[0]?.block_time || 0

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center flex-wrap gap-2">
          <div>
            <CardTitle>Sandwich Highlights</CardTitle>
            <CardDescription>Latest and most profitable sandwich attacks</CardDescription>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            {lastUpdated ? `Last updated: ${lastUpdated.toLocaleTimeString()}` : "Loading..."}
            <Button variant="outline" size="sm" onClick={fetchHighlights} disabled={loading}>
              Refresh
            </Button>
          </div>
        </div>
        {latestBlock > 0 && (
          <div className="text-sm text-muted-foreground">
            Latest Block: {latestBlock} | {new Date(latestBlockTime * 1000).toLocaleString()}
          </div>
        )}
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="latest">
          <TabsList className="mb-4">
            <TabsTrigger value="latest">Latest Sandwiches</TabsTrigger>
            <TabsTrigger value="profitable">Most Profitable</TabsTrigger>
          </TabsList>

          <TabsContent value="latest">
            {loading && !data ? (
              <div className="text-center py-4">Loading latest sandwiches...</div>
            ) : error ? (
              <div className="text-center py-4 text-red-500">Error: {error.message}</div>
            ) : data ? (
              <SortableTable data={data.latest_sandwiches} columns={columns} pageSize={5} />
            ) : null}
          </TabsContent>

          <TabsContent value="profitable">
            {loading && !data ? (
              <div className="text-center py-4">Loading profitable sandwiches...</div>
            ) : error ? (
              <div className="text-center py-4 text-red-500">Error: {error.message}</div>
            ) : data ? (
              <SortableTable data={data.most_profitable_sandwiches} columns={columns} pageSize={5} />
            ) : null}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

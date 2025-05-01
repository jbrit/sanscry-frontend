"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SortableTable } from "@/components/ui/sortable-table"
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import type { TargetedToken } from "@/lib/api"
import { formatTokenAddress } from "@/lib/dex-mapping"
import { usePrice } from "@/lib/price-context"

interface TargetedTokensProps {
  data: TargetedToken[]
}

export function TargetedTokens({ data }: TargetedTokensProps) {
  const { formatValue } = usePrice()

  // Prepare data for the chart - take top 5 for clarity
  const chartData = data.slice(0, 5).map((item) => ({
    token: formatTokenAddress(item.token),
    count: item.sandwich_count,
    profit: item.total_profit,
  }))

  const columns = [
    {
      key: "token",
      header: "Token",
      cell: (item: TargetedToken) => <span className="font-medium">{formatTokenAddress(item.token)}</span>,
    },
    {
      key: "sandwich_count",
      header: "Count",
      cell: (item: TargetedToken) => item.sandwich_count,
      sortable: true,
      sortKey: "sandwich_count" as keyof TargetedToken,
    },
    {
      key: "total_profit",
      header: "Total Profit",
      cell: (item: TargetedToken) => formatValue(item.total_profit),
      sortable: true,
      sortKey: "total_profit" as keyof TargetedToken,
    },
    {
      key: "unique_attackers",
      header: "Attackers",
      cell: (item: TargetedToken) => item.unique_attackers,
      sortable: true,
      sortKey: "unique_attackers" as keyof TargetedToken,
    },
  ]

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Most Targeted Tokens</CardTitle>
        <CardDescription>Tokens that are frequently targeted in sandwich attacks</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[200px] mb-6">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="token" />
              <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
              <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
              <Tooltip />
              <Legend />
              <Bar yAxisId="left" dataKey="profit" name="Total Profit" fill="#8884d8" />
              <Bar yAxisId="right" dataKey="count" name="Sandwich Count" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <SortableTable data={data} columns={columns} />
      </CardContent>
    </Card>
  )
}

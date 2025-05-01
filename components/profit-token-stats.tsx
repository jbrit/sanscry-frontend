"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SortableTable } from "@/components/ui/sortable-table"
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import type { ProfitToken } from "@/lib/api"
import { formatTokenAddress } from "@/lib/dex-mapping"
import { usePrice } from "@/lib/price-context"

interface ProfitTokenStatsProps {
  data: ProfitToken[]
}

export function ProfitTokenStats({ data }: ProfitTokenStatsProps) {
  const { formatValue } = usePrice()

  // Prepare data for the chart
  const chartData = data.map((item) => ({
    token: formatTokenAddress(item.profit_token),
    profit: item.total_profit,
    sandwiches: item.total_sandwiches,
  }))

  const columns = [
    {
      key: "token",
      header: "Token",
      cell: (item: ProfitToken) => <span className="font-medium">{formatTokenAddress(item.profit_token)}</span>,
    },
    {
      key: "total_sandwiches",
      header: "Sandwiches",
      cell: (item: ProfitToken) => item.total_sandwiches,
      sortable: true,
      sortKey: "total_sandwiches" as keyof ProfitToken,
    },
    {
      key: "total_profit",
      header: "Total Profit",
      cell: (item: ProfitToken) => formatValue(item.total_profit),
      sortable: true,
      sortKey: "total_profit" as keyof ProfitToken,
    },
    {
      key: "unique_victims",
      header: "Victims",
      cell: (item: ProfitToken) => item.unique_victims,
      sortable: true,
      sortKey: "unique_victims" as keyof ProfitToken,
    },
  ]

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Profit Token Stats</CardTitle>
        <CardDescription>Tokens used for extracting profit in sandwich attacks</CardDescription>
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
              <Bar yAxisId="right" dataKey="sandwiches" name="Sandwich Count" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <SortableTable data={data} columns={columns} />
      </CardContent>
    </Card>
  )
}

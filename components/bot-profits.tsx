"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SortableTable } from "@/components/ui/sortable-table"
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import type { BotProfit } from "@/lib/api"
import { formatBotAddress } from "@/lib/dex-mapping"
import { usePrice } from "@/lib/price-context"

interface BotProfitsProps {
  data: BotProfit[]
}

export function BotProfits({ data }: BotProfitsProps) {
  const { formatValue } = usePrice()

  // Prepare data for the chart
  const chartData = data.map((item) => ({
    bot: formatBotAddress(item.bot),
    profit: item.total_profit,
    avgProfit: item.avg_profit_per_sandwich,
  }))

  const columns = [
    {
      key: "bot",
      header: "Bot",
      cell: (item: BotProfit) => <span className="font-medium">{formatBotAddress(item.bot)}</span>,
    },
    {
      key: "total_profit",
      header: "Total Profit",
      cell: (item: BotProfit) => formatValue(item.total_profit),
      sortable: true,
      sortKey: "total_profit" as keyof BotProfit,
    },
    {
      key: "sandwich_count",
      header: "Count",
      cell: (item: BotProfit) => item.sandwich_count,
      sortable: true,
      sortKey: "sandwich_count" as keyof BotProfit,
    },
    {
      key: "avg_profit_per_sandwich",
      header: "Avg Profit",
      cell: (item: BotProfit) => formatValue(item.avg_profit_per_sandwich),
      sortable: true,
      sortKey: "avg_profit_per_sandwich" as keyof BotProfit,
    },
  ]

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Bot Cumulative Profits</CardTitle>
        <CardDescription>Profits accumulated by sandwich attack bots</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[200px] mb-6">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="bot" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="profit" name="Total Profit" fill="#8884d8" />
              <Bar dataKey="avgProfit" name="Avg Profit/Sandwich" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <SortableTable data={data} columns={columns} />
      </CardContent>
    </Card>
  )
}

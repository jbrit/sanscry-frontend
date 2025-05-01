"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { type BotProfit, formatBotAddress } from "@/lib/api"

interface BotProfitsProps {
  data: BotProfit[]
}

export function BotProfits({ data }: BotProfitsProps) {
  // Prepare data for the chart
  const chartData = data.map((item) => ({
    bot: formatBotAddress(item.bot),
    profit: item.total_profit,
    avgProfit: item.avg_profit_per_sandwich,
  }))

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
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Bot</TableHead>
              <TableHead>Total Profit</TableHead>
              <TableHead>Count</TableHead>
              <TableHead>Avg Profit</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.bot}>
                <TableCell className="font-medium">{formatBotAddress(item.bot)}</TableCell>
                <TableCell>{item.total_profit.toFixed(4)}</TableCell>
                <TableCell>{item.sandwich_count}</TableCell>
                <TableCell>{item.avg_profit_per_sandwich.toFixed(4)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

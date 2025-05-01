"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { type ProfitToken, formatTokenAddress } from "@/lib/api"

interface ProfitTokenStatsProps {
  data: ProfitToken[]
}

export function ProfitTokenStats({ data }: ProfitTokenStatsProps) {
  // Prepare data for the chart
  const chartData = data.map((item) => ({
    token: formatTokenAddress(item.profit_token),
    profit: item.total_profit,
    sandwiches: item.total_sandwiches,
  }))

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
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Token</TableHead>
              <TableHead>Sandwiches</TableHead>
              <TableHead>Total Profit</TableHead>
              <TableHead>Victims</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.profit_token}>
                <TableCell className="font-medium">{formatTokenAddress(item.profit_token)}</TableCell>
                <TableCell>{item.total_sandwiches}</TableCell>
                <TableCell>{item.total_profit.toFixed(2)}</TableCell>
                <TableCell>{item.unique_victims}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

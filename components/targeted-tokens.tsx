"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { type TargetedToken, formatTokenAddress } from "@/lib/api"

interface TargetedTokensProps {
  data: TargetedToken[]
}

export function TargetedTokens({ data }: TargetedTokensProps) {
  // Prepare data for the chart - take top 5 for clarity
  const chartData = data.slice(0, 5).map((item) => ({
    token: formatTokenAddress(item.token),
    count: item.sandwich_count,
    profit: item.total_profit,
  }))

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
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Token</TableHead>
              <TableHead>Count</TableHead>
              <TableHead>Total Profit</TableHead>
              <TableHead>Attackers</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.token}>
                <TableCell className="font-medium">{formatTokenAddress(item.token)}</TableCell>
                <TableCell>{item.sandwich_count}</TableCell>
                <TableCell>{item.total_profit.toFixed(4)}</TableCell>
                <TableCell>{item.unique_attackers}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

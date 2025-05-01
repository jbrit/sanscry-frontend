"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { type AttackFrequency as AttackFrequencyType, formatDexAddress } from "@/lib/api"

interface AttackFrequencyProps {
  data: AttackFrequencyType[]
}

export function AttackFrequency({ data }: AttackFrequencyProps) {
  // Prepare data for the chart
  const chartData = data.map((item) => ({
    dex: formatDexAddress(item.dex),
    attacks: item.total_attacks,
    attackers: item.unique_attackers,
    avgPerBlock: item.avg_attacks_per_block,
  }))

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Attack Frequency</CardTitle>
        <CardDescription>Frequency of sandwich attacks per program</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[200px] mb-6">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="dex" />
              <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
              <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
              <Tooltip />
              <Legend />
              <Bar yAxisId="left" dataKey="attacks" name="Total Attacks" fill="#8884d8" />
              <Bar yAxisId="left" dataKey="attackers" name="Unique Attackers" fill="#82ca9d" />
              <Bar yAxisId="right" dataKey="avgPerBlock" name="Avg Per Block" fill="#ffc658" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>DEX</TableHead>
              <TableHead>Total Attacks</TableHead>
              <TableHead>Unique Attackers</TableHead>
              <TableHead>Avg Per Block</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.dex}>
                <TableCell className="font-medium">{formatDexAddress(item.dex)}</TableCell>
                <TableCell>{item.total_attacks}</TableCell>
                <TableCell>{item.unique_attackers}</TableCell>
                <TableCell>{item.avg_attacks_per_block.toFixed(3)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

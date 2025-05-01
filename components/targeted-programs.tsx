"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"
import { type TargetedProgram, formatDexAddress } from "@/lib/api"

interface TargetedProgramsProps {
  data: TargetedProgram[]
}

export function TargetedPrograms({ data }: TargetedProgramsProps) {
  // Prepare data for the chart
  const chartData = data.map((item) => ({
    name: formatDexAddress(item.dex),
    value: item.sandwich_count,
  }))

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Most Targeted Programs</CardTitle>
        <CardDescription>DEXes that are frequently targeted in sandwich attacks</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[200px] mb-6">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>DEX</TableHead>
              <TableHead>Count</TableHead>
              <TableHead>Total Profit</TableHead>
              <TableHead>Unique Pools</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.dex}>
                <TableCell className="font-medium">{formatDexAddress(item.dex)}</TableCell>
                <TableCell>{item.sandwich_count}</TableCell>
                <TableCell>{item.total_profit.toFixed(4)}</TableCell>
                <TableCell>{item.unique_pools}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

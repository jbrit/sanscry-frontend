"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SortableTable } from "@/components/ui/sortable-table"
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"
import type { TargetedProgram } from "@/lib/api"
import { formatDexName } from "@/lib/dex-mapping"
import { usePrice } from "@/lib/price-context"

interface TargetedProgramsProps {
  data: TargetedProgram[]
}

export function TargetedPrograms({ data }: TargetedProgramsProps) {
  const { formatValue } = usePrice()

  // Prepare data for the chart
  const chartData = data.map((item) => ({
    name: formatDexName(item.dex),
    value: item.sandwich_count,
  }))

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#82ca9d"]

  const columns = [
    {
      key: "dex",
      header: "DEX",
      cell: (item: TargetedProgram) => <span className="font-medium">{formatDexName(item.dex)}</span>,
    },
    {
      key: "sandwich_count",
      header: "Count",
      cell: (item: TargetedProgram) => item.sandwich_count,
      sortable: true,
      sortKey: "sandwich_count" as keyof TargetedProgram,
    },
    {
      key: "total_profit",
      header: "Total Profit",
      cell: (item: TargetedProgram) => formatValue(item.total_profit),
      sortable: true,
      sortKey: "total_profit" as keyof TargetedProgram,
    },
    {
      key: "unique_pools",
      header: "Unique Pools",
      cell: (item: TargetedProgram) => item.unique_pools,
      sortable: true,
      sortKey: "unique_pools" as keyof TargetedProgram,
    },
  ]

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

        <SortableTable data={data} columns={columns} />
      </CardContent>
    </Card>
  )
}

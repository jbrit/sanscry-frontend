"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SortableTable } from "@/components/ui/sortable-table"
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import type { AttackFrequency as AttackFrequencyType } from "@/lib/api"
import { formatDexName } from "@/lib/dex-mapping"

interface AttackFrequencyProps {
  data: AttackFrequencyType[]
}

export function AttackFrequency({ data }: AttackFrequencyProps) {
  // Prepare data for the chart
  const chartData = data.map((item) => ({
    dex: formatDexName(item.dex),
    attacks: item.total_attacks,
    attackers: item.unique_attackers,
    avgPerBlock: item.avg_attacks_per_block,
  }))

  const columns = [
    {
      key: "dex",
      header: "DEX",
      cell: (item: AttackFrequencyType) => <span className="font-medium">{formatDexName(item.dex)}</span>,
    },
    {
      key: "total_attacks",
      header: "Total Attacks",
      cell: (item: AttackFrequencyType) => item.total_attacks,
      sortable: true,
      sortKey: "total_attacks" as keyof AttackFrequencyType,
    },
    {
      key: "unique_attackers",
      header: "Unique Attackers",
      cell: (item: AttackFrequencyType) => item.unique_attackers,
      sortable: true,
      sortKey: "unique_attackers" as keyof AttackFrequencyType,
    },
    {
      key: "avg_attacks_per_block",
      header: "Avg Per Block",
      cell: (item: AttackFrequencyType) => item.avg_attacks_per_block.toFixed(3),
      sortable: true,
      sortKey: "avg_attacks_per_block" as keyof AttackFrequencyType,
    },
  ]

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

        <SortableTable data={data} columns={columns} />
      </CardContent>
    </Card>
  )
}

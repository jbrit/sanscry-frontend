"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { usePrice } from "@/lib/price-context"
import { formatDexName, formatPoolAddress, formatBotAddress, formatTokenAddress } from "@/lib/dex-mapping"
import { ExternalLink, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

interface TransactionDetail {
  signature: string
  from_token: string
  to_token: string
  from_token_amount: number
  to_token_amount: number
  jito_tip?: number
  priority_fee?: number
  signer?: string
}

interface SandwichDetail {
  sandwich_id: string
  profit: number
  block: number
  block_time: number
  dex: string
  pool: string
  bot: string
  attacker: string
  entry_tx: TransactionDetail
  exit_tx: TransactionDetail
  target_txs: TransactionDetail[]
}

export function SandwichDetail({ sandwichId }: { sandwichId: string }) {
  const [data, setData] = useState<SandwichDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const { formatValue } = usePrice()
  const router = useRouter()

  useEffect(() => {
    const fetchSandwichDetail = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/api/sandwiches/${sandwichId}`)

        if (!response.ok) {
          throw new Error(`API error: ${response.status}`)
        }

        const result = await response.json()
        setData(result)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Failed to fetch sandwich details"))
      } finally {
        setLoading(false)
      }
    }

    fetchSandwichDetail()
  }, [sandwichId])

  if (loading) {
    return <div className="text-center py-8">Loading sandwich details...</div>
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">Error: {error.message}</div>
  }

  if (!data) {
    return <div className="text-center py-8">No data available</div>
  }

  const formatTxLink = (signature: string) => {
    return `https://solscan.io/tx/${signature}`
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <h1 className="text-2xl font-bold">Sandwich Attack Details</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Overview</CardTitle>
          <CardDescription>Basic information about this sandwich attack</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium">Sandwich ID</h3>
              <div className="flex items-center gap-2">
                <span className="text-sm break-all">{data.sandwich_id}</span>
                <a href={formatTxLink(data.sandwich_id)} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>
            <div>
              <h3 className="font-medium">Profit</h3>
              <p className="text-sm">{formatValue(data.profit)}</p>
            </div>
            <div>
              <h3 className="font-medium">Block</h3>
              <p className="text-sm">{data.block}</p>
            </div>
            <div>
              <h3 className="font-medium">Time</h3>
              <p className="text-sm">{new Date(data.block_time * 1000).toLocaleString()}</p>
            </div>
            <div>
              <h3 className="font-medium">DEX</h3>
              <p className="text-sm">{formatDexName(data.dex)}</p>
            </div>
            <div>
              <h3 className="font-medium">Pool</h3>
              <p className="text-sm">{formatPoolAddress(data.pool)}</p>
            </div>
            <div>
              <h3 className="font-medium">Bot</h3>
              <p className="text-sm">{formatBotAddress(data.bot)}</p>
            </div>
            <div>
              <h3 className="font-medium">Attacker</h3>
              <p className="text-sm">{formatBotAddress(data.attacker)}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-6">
        {/* Entry Transaction */}
        <Card>
          <CardHeader>
            <CardTitle>Entry Transaction</CardTitle>
            <CardDescription>Initial transaction by the attacker</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Signature</TableHead>
                    <TableHead>From Token</TableHead>
                    <TableHead>To Token</TableHead>
                    <TableHead>From Amount</TableHead>
                    <TableHead>To Amount</TableHead>
                    <TableHead>Jito Tip</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <span className="text-sm">{data.entry_tx.signature.slice(0, 8)}...</span>
                        <a href={formatTxLink(data.entry_tx.signature)} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </div>
                    </TableCell>
                    <TableCell>{formatTokenAddress(data.entry_tx.from_token)}</TableCell>
                    <TableCell>{formatTokenAddress(data.entry_tx.to_token)}</TableCell>
                    <TableCell>{data.entry_tx.from_token_amount.toFixed(4)}</TableCell>
                    <TableCell>{data.entry_tx.to_token_amount.toFixed(4)}</TableCell>
                    <TableCell>{data.entry_tx.jito_tip?.toFixed(8) || "0"}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Target Transactions */}
        <Card className="ml-6">
          <CardHeader>
            <CardTitle>Target Transactions</CardTitle>
            <CardDescription>Victim transactions that were sandwiched</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Signature</TableHead>
                    <TableHead>Signer</TableHead>
                    <TableHead>From Token</TableHead>
                    <TableHead>To Token</TableHead>
                    <TableHead>From Amount</TableHead>
                    <TableHead>To Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.target_txs.map((tx, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <span className="text-sm">{tx.signature.slice(0, 8)}...</span>
                          <a href={formatTxLink(tx.signature)} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        </div>
                      </TableCell>
                      <TableCell>{tx.signer ? formatBotAddress(tx.signer) : "N/A"}</TableCell>
                      <TableCell>{formatTokenAddress(tx.from_token)}</TableCell>
                      <TableCell>{formatTokenAddress(tx.to_token)}</TableCell>
                      <TableCell>{tx.from_token_amount.toFixed(4)}</TableCell>
                      <TableCell>{tx.to_token_amount.toFixed(4)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Exit Transaction */}
        <Card>
          <CardHeader>
            <CardTitle>Exit Transaction</CardTitle>
            <CardDescription>Final transaction by the attacker</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Signature</TableHead>
                    <TableHead>From Token</TableHead>
                    <TableHead>To Token</TableHead>
                    <TableHead>From Amount</TableHead>
                    <TableHead>To Amount</TableHead>
                    <TableHead>Jito Tip</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <span className="text-sm">{data.exit_tx.signature.slice(0, 8)}...</span>
                        <a href={formatTxLink(data.exit_tx.signature)} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </div>
                    </TableCell>
                    <TableCell>{formatTokenAddress(data.exit_tx.from_token)}</TableCell>
                    <TableCell>{formatTokenAddress(data.exit_tx.to_token)}</TableCell>
                    <TableCell>{data.exit_tx.from_token_amount.toFixed(4)}</TableCell>
                    <TableCell>{data.exit_tx.to_token_amount.toFixed(4)}</TableCell>
                    <TableCell>{data.exit_tx.jito_tip?.toFixed(8) || "0"}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

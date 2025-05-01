"use client"

import { useData } from "@/components/data-provider"
import { calculateSummaryStats } from "@/lib/api"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, BarChart3, Github, RefreshCw, BookOpen, Menu, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SummaryCards } from "@/components/summary-cards"
import { ProfitTokenStats } from "@/components/profit-token-stats"
import { TargetedTokens } from "@/components/targeted-tokens"
import { TargetedPrograms } from "@/components/targeted-programs"
import { ExploitedPools } from "@/components/exploited-pools"
import { BotProfits } from "@/components/bot-profits"
import { AttackFrequency } from "@/components/attack-frequency"
import { ThemeToggle } from "@/components/theme-toggle"
import { CurrencyToggle } from "@/components/currency-toggle"
import { SandwichHighlights } from "@/components/sandwich-highlights"
import { useState } from "react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function Dashboard() {
  const { data, loading, error, refetch } = useData()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  if (error) {
    return (
      <div className="container mx-auto p-4">
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>Failed to load dashboard data: {error.message}</AlertDescription>
        </Alert>
        <Button onClick={() => refetch()}>
          <RefreshCw className="mr-2 h-4 w-4" />
          Retry
        </Button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <div className="flex items-center gap-2">
          <BarChart3 className="h-6 w-6 text-primary" />
          <h1 className="text-xl font-semibold">Sanscry Dashboard</h1>
        </div>

        {/* Mobile menu */}
        <div className="md:hidden ml-auto">
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col gap-4 py-4">
                <CurrencyToggle className="w-full" />
                <Button variant="outline" size="sm" asChild className="w-full justify-start">
                  <a
                    href="https://github.com/jbrit/sanscry"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <Github className="h-4 w-4" />
                    <span>GitHub</span>
                  </a>
                </Button>
                <Button variant="outline" size="sm" asChild className="w-full justify-start">
                  <a
                    href="https://sanscry-auo55.kinsta.app/docs"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <BookOpen className="h-4 w-4" />
                    <span>API Docs</span>
                  </a>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => refetch()}
                  disabled={loading}
                  className="w-full justify-start"
                >
                  <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
                  <span>Refresh Data</span>
                </Button>
                <ThemeToggle />
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Desktop menu */}
        <div className="hidden md:flex ml-auto items-center gap-4">
          <CurrencyToggle />
          <Button variant="outline" size="sm" asChild>
            <a
              href="https://github.com/jbrit/sanscry"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <Github className="h-4 w-4" />
              <span>GitHub</span>
            </a>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <a
              href="https://sanscry-auo55.kinsta.app/docs"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <BookOpen className="h-4 w-4" />
              <span>API Docs</span>
            </a>
          </Button>
          <Button variant="outline" size="icon" onClick={() => refetch()} disabled={loading}>
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          </Button>
          <ThemeToggle />
        </div>
      </header>

      <main className="container mx-auto p-4 md:p-6 flex-1">
        <div className="mb-6 flex items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" className="h-8 w-8">
                  <Info className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent className="max-w-md">
                <p>
                  The algorithm to fetch sandwiches in a block together with the queries are open source and available
                  in the GitHub repository. Data fetches are periodic but rate limited.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <p className="text-sm text-muted-foreground">Data is fetched periodically. Refresh for the latest updates.</p>
        </div>

        {loading && !data ? (
          <LoadingSkeleton />
        ) : data ? (
          <div className="flex flex-col gap-6">
            <SummaryCards data={calculateSummaryStats(data)} />

            <SandwichHighlights />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ProfitTokenStats data={data.profit_token_stats} />
              <TargetedTokens data={data.most_targeted_tokens} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <TargetedPrograms data={data.most_targeted_programs} />
              <ExploitedPools data={data.most_exploited_pools} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <BotProfits data={data.bot_cumulative_profits} />
              <AttackFrequency data={data.attack_frequency_per_program} />
            </div>
          </div>
        ) : null}
      </main>

      <footer className="border-t py-4 px-6 text-center text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()} ajibolaojo. All rights reserved.
      </footer>
    </div>
  )
}

function LoadingSkeleton() {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardHeader className="pb-2">
              <Skeleton className="h-4 w-24" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-20 mb-1" />
              <Skeleton className="h-4 w-32" />
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <Skeleton className="h-5 w-32 mb-1" />
          <Skeleton className="h-4 w-48" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-[200px] w-full" />
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-5 w-32 mb-1" />
              <Skeleton className="h-4 w-48" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-[200px] w-full mb-6" />
              <Skeleton className="h-32 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

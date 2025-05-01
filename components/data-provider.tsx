"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { type DashboardData, fetchDashboardData } from "@/lib/api"

interface DataContextType {
  data: DashboardData | null
  loading: boolean
  error: Error | null
  refetch: () => Promise<void>
}

const DataContext = createContext<DataContextType>({
  data: null,
  loading: true,
  error: null,
  refetch: async () => {},
})

export function useData() {
  return useContext(DataContext)
}

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchData = async () => {
    try {
      setLoading(true)
      const result = await fetchDashboardData()
      setData(result)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Unknown error occurred"))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return <DataContext.Provider value={{ data, loading, error, refetch: fetchData }}>{children}</DataContext.Provider>
}

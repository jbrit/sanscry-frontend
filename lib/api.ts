// Types for our data structure
export interface ProfitToken {
  profit_token: string
  total_sandwiches: number
  total_profit: number
  total_jito_tip: number
  unique_victims: number
  unique_attackers: number
}

export interface TargetedToken {
  token: string
  sandwich_count: number
  total_profit: number
  unique_attackers: number
}

export interface TargetedProgram {
  dex: string
  sandwich_count: number
  total_profit: number
  unique_pools: number
}

export interface ExploitedPool {
  pool: string
  dex: string
  sandwich_count: number
  total_profit: number
}

export interface BotProfit {
  bot: string
  total_profit: number
  sandwich_count: number
  avg_profit_per_sandwich: number
}

export interface AttackFrequency {
  dex: string
  total_attacks: number
  unique_attackers: number
  avg_attacks_per_block: number
}

export interface DashboardData {
  profit_token_stats: ProfitToken[]
  most_targeted_tokens: TargetedToken[]
  most_targeted_programs: TargetedProgram[]
  most_exploited_pools: ExploitedPool[]
  bot_cumulative_profits: BotProfit[]
  attack_frequency_per_program: AttackFrequency[]
}

// Mock data for development
const mockData: DashboardData = {
  profit_token_stats: [
    {
      profit_token: "5cQtbxhPTVQJVKKiQazpmQpSZzEJaZ86F55sFpYvpump",
      total_sandwiches: 1,
      total_profit: 4.407189956,
      total_jito_tip: 0.0,
      unique_victims: 2,
      unique_attackers: 1,
    },
    {
      profit_token: "6jdvqrXjXmv3dLshKQWY2wx7UNw1E9qQ5spXTB1yDJZy",
      total_sandwiches: 3,
      total_profit: 3396.45920965,
      total_jito_tip: 6.5e-5,
      unique_victims: 12,
      unique_attackers: 3,
    },
    {
      profit_token: "So11111111111111111111111111111111111111112",
      total_sandwiches: 10,
      total_profit: 32.051779421,
      total_jito_tip: 0.030085794,
      unique_victims: 22,
      unique_attackers: 10,
    },
  ],
  most_targeted_tokens: [
    {
      token: "So11111111111111111111111111111111111111112",
      sandwich_count: 4,
      total_profit: 263.469688028,
      unique_attackers: 4,
    },
    {
      token: "6jiJ39V5wGbfvrvVzufZLTdnMCDUa4W64C5qZuW8pump",
      sandwich_count: 3,
      total_profit: 0.077999303,
      unique_attackers: 3,
    },
    {
      token: "EzgNNibkP1ovDgwmCtDKSDNkH5Pr4fboa1bs2hSpump",
      sandwich_count: 3,
      total_profit: 0.000571834,
      unique_attackers: 3,
    },
    {
      token: "HxQW4BiUWBPEPxTPVq5ZfY5hEpFe8hSV1px98twWpump",
      sandwich_count: 2,
      total_profit: 0.078308732,
      unique_attackers: 2,
    },
    {
      token: "6jdvqrXjXmv3dLshKQWY2wx7UNw1E9qQ5spXTB1yDJZy",
      sandwich_count: 1,
      total_profit: 1.12759984,
      unique_attackers: 1,
    },
    {
      token: "GYqG8wgVfpxRu8w9K98SmdTW61UCvsKo7dgc51pHnW8c",
      sandwich_count: 1,
      total_profit: 0.109075918,
      unique_attackers: 1,
    },
  ],
  most_targeted_programs: [
    {
      dex: "pAMMBay6oceH9fJKBRHGP5D4bD4sWpmSwMn52FMfXEA",
      sandwich_count: 9,
      total_profit: 2.360474847,
      unique_pools: 4,
    },
    {
      dex: "CAMMCzo5YL8w4VFF8KVHrK22GGUsp5VTaW7grrKgrWqK",
      sandwich_count: 5,
      total_profit: 262.502768808,
      unique_pools: 2,
    },
  ],
  most_exploited_pools: [
    {
      pool: "3KLxjVk81syADRyAWRcGPBEEgvA19oGYEuhYUs1EFRoq",
      dex: "CAMMCzo5YL8w4VFF8KVHrK22GGUsp5VTaW7grrKgrWqK",
      sandwich_count: 4,
      total_profit: 262.39369289,
    },
    {
      pool: "FK84jLzH6HWYSvAJk3e2kX4ffgvNZqVrq8dnk2Vr9DWM",
      dex: "pAMMBay6oceH9fJKBRHGP5D4bD4sWpmSwMn52FMfXEA",
      sandwich_count: 3,
      total_profit: 0.000571834,
    },
    {
      pool: "3Fh9jwYjUn7yQup5TMNR3mNH7tU8cyxEoCjFjNogBJUU",
      dex: "pAMMBay6oceH9fJKBRHGP5D4bD4sWpmSwMn52FMfXEA",
      sandwich_count: 3,
      total_profit: 0.077999303,
    },
    {
      pool: "382vDLYZjr4oP1ZAikFP4Mirmzjwat2UMa5z937itpPj",
      dex: "pAMMBay6oceH9fJKBRHGP5D4bD4sWpmSwMn52FMfXEA",
      sandwich_count: 2,
      total_profit: 0.078308732,
    },
    {
      pool: "7RmMys9XBS8uz6bvjSKcrHaC682HyyXGEpAjhfVYnFXT",
      dex: "pAMMBay6oceH9fJKBRHGP5D4bD4sWpmSwMn52FMfXEA",
      sandwich_count: 1,
      total_profit: 2.203594978,
    },
    {
      pool: "J5hnHMVdnRLwzCKymiE8qFfJysduW5SPesP6dDpL76KA",
      dex: "CAMMCzo5YL8w4VFF8KVHrK22GGUsp5VTaW7grrKgrWqK",
      sandwich_count: 1,
      total_profit: 0.109075918,
    },
  ],
  bot_cumulative_profits: [
    {
      bot: "CAMMCzo5YL8w4VFF8KVHrK22GGUsp5VTaW7grrKgrWqK",
      total_profit: 262.502768808,
      sandwich_count: 5,
      avg_profit_per_sandwich: 52.500553761,
    },
    {
      bot: "pAMMBay6oceH9fJKBRHGP5D4bD4sWpmSwMn52FMfXEA",
      total_profit: 2.204166812,
      sandwich_count: 4,
      avg_profit_per_sandwich: 0.551041703,
    },
    {
      bot: "E6YoRP3adE5XYneSseLee15wJshDxCsmyD2WtLvAmfLi",
      total_profit: 0.082047854,
      sandwich_count: 2,
      avg_profit_per_sandwich: 0.041023927,
    },
    {
      bot: "vvvnvfabNF1bsC4bAb5sGKBbQ2n48BFeW7VcYowK3gM",
      total_profit: 0.074260181,
      sandwich_count: 3,
      avg_profit_per_sandwich: 0.024753393,
    },
  ],
  attack_frequency_per_program: [
    {
      dex: "pAMMBay6oceH9fJKBRHGP5D4bD4sWpmSwMn52FMfXEA",
      total_attacks: 9,
      unique_attackers: 9,
      avg_attacks_per_block: 1.125,
    },
    {
      dex: "CAMMCzo5YL8w4VFF8KVHrK22GGUsp5VTaW7grrKgrWqK",
      total_attacks: 5,
      unique_attackers: 5,
      avg_attacks_per_block: 1.25,
    },
  ],
}

// Data fetching function
export async function fetchDashboardData(): Promise<DashboardData> {
  try {
    // Use our local API endpoint which proxies to the external API
    const response = await fetch("/api/dashboard")

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error fetching dashboard data:", error)
    // Fallback to mock data on error
    return mockData
  }
}

// Helper functions for formatting data
export function formatTokenAddress(address: string): string {
  if (address === "So11111111111111111111111111111111111111112") return "SOL"
  return `${address.slice(0, 4)}...${address.slice(-4)}`
}

export function formatDexAddress(address: string): string {
  return `${address.slice(0, 4)}...${address.slice(-4)}`
}

export function formatPoolAddress(address: string): string {
  return `${address.slice(0, 4)}...${address.slice(-4)}`
}

export function formatBotAddress(address: string): string {
  return `${address.slice(0, 4)}...${address.slice(-4)}`
}

// Calculate summary statistics
export function calculateSummaryStats(data: DashboardData) {
  const totalSandwiches = data.profit_token_stats.reduce((sum, item) => sum + item.total_sandwiches, 0)

  const totalProfit = data.profit_token_stats.reduce((sum, item) => sum + item.total_profit, 0)

  const uniqueVictims = data.profit_token_stats.reduce((sum, item) => sum + item.unique_victims, 0)

  const uniqueAttackers = data.profit_token_stats.reduce((sum, item) => sum + item.unique_attackers, 0)

  return {
    totalSandwiches,
    totalProfit,
    uniqueVictims,
    uniqueAttackers,
  }
}

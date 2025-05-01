import { NextResponse } from "next/server"

const API_URL = "https://sanscry-auo55.kinsta.app/stats"

export async function GET() {
  try {
    const response = await fetch(API_URL, {
      cache: "no-store",
    })

    if (!response.ok) {
      throw new Error(`External API error: ${response.status}`)
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching dashboard data:", error)
    return NextResponse.json({ error: "Failed to fetch dashboard data" }, { status: 500 })
  }
}

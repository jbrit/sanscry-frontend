import { NextResponse } from "next/server"

const API_URL = "https://sanscry-auo55.kinsta.app/highlights"

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
    console.error("Error fetching highlights:", error)
    return NextResponse.json({ error: "Failed to fetch highlights" }, { status: 500 })
  }
}

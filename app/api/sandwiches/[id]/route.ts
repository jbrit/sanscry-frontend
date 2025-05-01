import { NextResponse } from "next/server"

const API_BASE_URL = "https://sanscry-auo55.kinsta.app/sandwiches"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      next: { revalidate: 60 }, // Cache for 60 seconds
    })

    if (!response.ok) {
      throw new Error(`External API error: ${response.status}`)
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching sandwich details:", error)
    return NextResponse.json({ error: "Failed to fetch sandwich details" }, { status: 500 })
  }
}

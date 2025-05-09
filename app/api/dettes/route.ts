import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import Dette from "@/models/Dette"

export async function GET() {
  try {
    await connectToDatabase()
    const dettes = await Dette.find({}).populate("client_id").sort({ created_at: -1 })
    return NextResponse.json(dettes)
  } catch (error) {
    console.error("Erreur lors de la récupération des dettes:", error)
    return NextResponse.json({ error: "Erreur lors de la récupération des dettes" }, { status: 500 })
  }
}

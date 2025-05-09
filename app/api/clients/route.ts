import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import Client from "@/models/Client"

export async function GET() {
  try {
    await connectToDatabase()
    const clients = await Client.find({}).sort({ created_at: -1 }).lean() // ✅ lean()
    return NextResponse.json(clients)
  } catch (error) {
    console.error("Erreur lors de la récupération des clients:", error)
    return NextResponse.json({ error: "Erreur lors de la récupération des clients" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    await connectToDatabase()
    const client = new Client(body)
    await client.save()
    return NextResponse.json(client.toObject()) // ✅ plain object
  } catch (error) {
    console.error("Erreur lors de la création du client:", error)
    return NextResponse.json({ error: "Erreur lors de la création du client" }, { status: 500 })
  }
}


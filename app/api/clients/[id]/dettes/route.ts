import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import Dette from "@/models/Dette"
import Client from "@/models/Client"
import mongoose from "mongoose"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    await connectToDatabase()
    const { id } = params

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "ID client invalide" }, { status: 400 })
    }

    const client = await Client.findById(id)

    if (!client) {
      return NextResponse.json({ error: "Client non trouvé" }, { status: 404 })
    }

    const dettes = await Dette.find({ client_id: id }).sort({ created_at: -1 }).lean() // ✅ lean()

    return NextResponse.json(dettes)
  } catch (error) {
    console.error("Erreur lors de la récupération des dettes:", error)
    return NextResponse.json({ error: "Erreur lors de la récupération des dettes" }, { status: 500 })
  }
}

export async function POST(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    await connectToDatabase()
    const { id } = params

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "ID client invalide" }, { status: 400 })
    }

    const client = await Client.findById(id)

    if (!client) {
      return NextResponse.json({ error: "Client non trouvé" }, { status: 404 })
    }

    const dette = new Dette({
      client_id: id,
      produit: body.produit,
      prix: body.prix,
    })

    await dette.save()

    return NextResponse.json(dette.toObject()) // ✅ plain object
  } catch (error) {
    console.error("Erreur lors de la création de la dette:", error)
    return NextResponse.json({ error: "Erreur lors de la création de la dette" }, { status: 500 })
  }
}


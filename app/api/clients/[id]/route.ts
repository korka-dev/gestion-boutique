import { NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import Client from "@/models/Client"
import Dette from "@/models/Dette"
import mongoose from "mongoose"

function extractIdFromUrl(request: NextRequest): string {
  const url = new URL(request.url)
  return url.pathname.split("/").pop() as string
}

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase()
    const id = extractIdFromUrl(request)

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "ID client invalide" }, { status: 400 })
    }

    const client = await Client.findById(id)

    if (!client) {
      return NextResponse.json({ error: "Client non trouvé" }, { status: 404 })
    }

    return NextResponse.json(client)
  } catch (error) {
    console.error("Erreur lors de la récupération du client:", error)
    return NextResponse.json({ error: "Erreur lors de la récupération du client" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    await connectToDatabase()
    const id = extractIdFromUrl(request)

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "ID client invalide" }, { status: 400 })
    }

    // Supprimer le client
    const client = await Client.findByIdAndDelete(id)

    if (!client) {
      return NextResponse.json({ error: "Client non trouvé" }, { status: 404 })
    }

    // Supprimer toutes les dettes associées
    await Dette.deleteMany({ client_id: id })

    return NextResponse.json({ message: "Client et dettes associées supprimés avec succès" })
  } catch (error) {
    console.error("Erreur lors de la suppression du client:", error)
    return NextResponse.json({ error: "Erreur lors de la suppression du client" }, { status: 500 })
  }
}


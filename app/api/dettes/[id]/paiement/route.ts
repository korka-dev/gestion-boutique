import { NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import Dette from "@/models/Dette"
import mongoose from "mongoose"

function extractIdFromUrl(request: NextRequest): string {
  const url = new URL(request.url)
  return url.pathname.split("/").slice(-2, -1)[0] // pour récupérer `[id]` depuis /api/dettes/[id]/paiement
}

export async function PATCH(request: NextRequest) {
  try {
    await connectToDatabase()
    const id = extractIdFromUrl(request)

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "ID dette invalide" }, { status: 400 })
    }

    const body = await request.json()
    const { paye } = body

    const dette = await Dette.findByIdAndUpdate(id, { paye }, { new: true })

    if (!dette) {
      return NextResponse.json({ error: "Dette non trouvée" }, { status: 404 })
    }

    return NextResponse.json(dette)
  } catch (error) {
    console.error("Erreur lors de la mise à jour du statut de paiement:", error)
    return NextResponse.json({ error: "Erreur lors de la mise à jour du statut de paiement" }, { status: 500 })
  }
}


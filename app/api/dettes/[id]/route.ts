import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import Dette from "@/models/Dette"
import mongoose from "mongoose"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    await connectToDatabase()
    const { id } = params

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "ID dette invalide" }, { status: 400 })
    }

    const dette = await Dette.findById(id).populate("client_id")

    if (!dette) {
      return NextResponse.json({ error: "Dette non trouvée" }, { status: 404 })
    }

    return NextResponse.json(dette)
  } catch (error) {
    console.error("Erreur lors de la récupération de la dette:", error)
    return NextResponse.json({ error: "Erreur lors de la récupération de la dette" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await connectToDatabase()
    const { id } = params

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "ID dette invalide" }, { status: 400 })
    }

    const dette = await Dette.findByIdAndDelete(id)

    if (!dette) {
      return NextResponse.json({ error: "Dette non trouvée" }, { status: 404 })
    }

    return NextResponse.json({ message: "Dette supprimée avec succès" })
  } catch (error) {
    console.error("Erreur lors de la suppression de la dette:", error)
    return NextResponse.json({ error: "Erreur lors de la suppression de la dette" }, { status: 500 })
  }
}

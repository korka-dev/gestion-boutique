import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Plus } from "lucide-react"
import { connectToDatabase } from "@/lib/mongodb"
import Client from "@/models/Client"
import Dette from "@/models/Dette"

async function getClientsWithDettes() {
  await connectToDatabase()

  const clients = await Client.find({}).sort({ created_at: -1 })

  const clientsWithDettes = await Promise.all(
    clients.map(async (client) => {
      const dettes = await Dette.find({ client_id: client._id }).sort({ created_at: -1 })

      // Calculer le total des dettes non payées
      const totalDette = dettes.reduce((sum, dette) => {
        return sum + (dette.paye ? 0 : dette.prix)
      }, 0)

      // Compter les dettes non payées
      const dettesNonPayees = dettes.filter((dette) => !dette.paye).length

      return {
        ...client.toObject(),
        dettes: dettes,
        totalDette: totalDette,
        dettesNonPayees: dettesNonPayees,
      }
    }),
  )

  return clientsWithDettes
}

export default async function ClientsList() {
  const clientsWithDettes = await getClientsWithDettes()

  if (clientsWithDettes.length === 0) {
    return (
      <div className="text-center py-6 sm:py-8">
        <p className="text-gray-500 mb-4">Aucun client enregistré</p>
        <Button asChild>
          <Link href="/ajouter-client">Ajouter un client</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {clientsWithDettes.map((client) => (
        <Card key={client._id.toString()} className="overflow-hidden">
          <CardContent className="p-0">
            <div className="p-4">
              <h3 className="text-lg font-bold line-clamp-1">{client.nom}</h3>
              <p className="text-sm text-gray-500">Tél: {client.telephone}</p>
              <p className="text-sm text-gray-500 line-clamp-1">Lieu: {client.lieu}</p>
              <div className="mt-2">
                <p className="font-semibold">Total des dettes: {client.totalDette.toLocaleString()} FCFA</p>
                <p className="text-sm text-gray-500">
                  {client.dettesNonPayees} produit(s) non payé(s) sur {client.dettes.length}
                </p>
              </div>
            </div>
            <div className="flex border-t">
              <Link
                href={`/client/${client._id}`}
                className="flex-1 py-2 text-center hover:bg-gray-50 text-sm font-medium"
              >
                Voir détails
              </Link>
              <Link
                href={`/ajouter-dette/${client._id}`}
                className="flex-1 py-2 text-center border-l hover:bg-gray-50 text-sm font-medium text-primary"
              >
                <Plus className="inline-block h-3 w-3 mr-1" />
                Ajouter dette
              </Link>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

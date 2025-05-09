import Link from "next/link"
import { ArrowLeft, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { connectToDatabase } from "@/lib/mongodb"
import Client from "@/models/Client"
import Dette from "@/models/Dette"
import { DetteItem } from "@/components/dette-item"

export const revalidate = 0

async function getClientWithDettes(id: string) {
  await connectToDatabase()

  const client = await Client.findById(id)

  if (!client) return null

  const dettes = await Dette.find({ client_id: id }).sort({ created_at: -1 })

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
}

export default async function ClientDetailPage({ params }: { params: { id: string } }) {
  const clientWithDettes = await getClientWithDettes(params.id)

  if (!clientWithDettes) {
    return (
      <div className="container mx-auto px-4 py-4 sm:py-8 text-center">
        <p>Client non trouvé</p>
        <Button asChild className="mt-4">
          <Link href="/">Retour à l'accueil</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-4 sm:py-8">
      <div className="mb-4 sm:mb-6">
        <Button variant="outline" asChild size="sm">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 sm:gap-6 md:grid-cols-3">
        <Card className="md:col-span-1">
          <CardHeader className="px-4 sm:px-6">
            <CardTitle className="text-lg sm:text-xl">Informations du client</CardTitle>
          </CardHeader>
          <CardContent className="px-4 sm:px-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-bold break-words">{clientWithDettes.nom}</h3>
                <p className="text-gray-500">Téléphone: {clientWithDettes.telephone}</p>
                <p className="text-gray-500 break-words">Lieu: {clientWithDettes.lieu}</p>
              </div>
              <div className="pt-4 border-t">
                <p className="text-lg font-bold">
                  Total des dettes: {clientWithDettes.totalDette.toLocaleString()} FCFA
                </p>
                <p className="text-gray-500">
                  {clientWithDettes.dettesNonPayees} produit(s) non payé(s) sur {clientWithDettes.dettes.length}
                </p>
              </div>
              <Button asChild className="w-full">
                <Link href={`/ajouter-dette/${clientWithDettes._id}`}>
                  <Plus className="mr-2 h-4 w-4" />
                  Ajouter une dette
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader className="px-4 sm:px-6">
            <CardTitle className="text-lg sm:text-xl">Liste des dettes</CardTitle>
          </CardHeader>
          <CardContent className="px-4 sm:px-6">
            {clientWithDettes.dettes.length === 0 ? (
              <div className="text-center py-6 sm:py-8">
                <p className="text-gray-500 mb-4">Aucune dette enregistrée</p>
                <Button asChild>
                  <Link href={`/ajouter-dette/${clientWithDettes._id}`}>Ajouter une dette</Link>
                </Button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Produit</TableHead>
                      <TableHead className="text-right">Prix (FCFA)</TableHead>
                      <TableHead className="hidden sm:table-cell">Date</TableHead>
                      <TableHead className="w-[80px]">Statut</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {clientWithDettes.dettes.map((dette) => (
                      <DetteItem key={dette._id.toString()} dette={dette} clientId={clientWithDettes._id.toString()} />
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

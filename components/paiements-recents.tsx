import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Données fictives pour l'exemple
const paiementsRecents = [
  {
    id: "1",
    client: "Boutique Mode",
    montant: 1200,
    date: "2024-02-18",
    methode: "Virement bancaire",
  },
  {
    id: "2",
    client: "Restaurant Gourmet",
    montant: 800,
    date: "2024-02-15",
    methode: "Carte bancaire",
  },
  {
    id: "3",
    client: "Entreprise ABC",
    montant: 2000,
    date: "2024-02-10",
    methode: "Chèque",
  },
  {
    id: "4",
    client: "Magasin 123",
    montant: 500,
    date: "2024-02-05",
    methode: "Espèces",
  },
]

export function PaiementsRecents() {
  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Client</TableHead>
            <TableHead className="text-right">Montant</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Méthode</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paiementsRecents.map((paiement) => (
            <TableRow key={paiement.id}>
              <TableCell className="font-medium">{paiement.client}</TableCell>
              <TableCell className="text-right">{paiement.montant.toLocaleString()} €</TableCell>
              <TableCell>{new Date(paiement.date).toLocaleDateString("fr-FR")}</TableCell>
              <TableCell>{paiement.methode}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

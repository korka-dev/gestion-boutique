import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

// Données fictives pour l'exemple
const dettesRecentes = [
  {
    id: "1",
    client: "Entreprise ABC",
    montant: 5000,
    dateEcheance: "2024-03-15",
    statut: "En cours",
  },
  {
    id: "2",
    client: "Société XYZ",
    montant: 3200,
    dateEcheance: "2024-02-20",
    statut: "En retard",
  },
  {
    id: "3",
    client: "Magasin 123",
    montant: 1800,
    dateEcheance: "2024-04-01",
    statut: "En cours",
  },
  {
    id: "4",
    client: "Boutique Mode",
    montant: 2500,
    dateEcheance: "2024-03-10",
    statut: "En cours",
  },
]

export function DettesRecentes() {
  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Client</TableHead>
            <TableHead className="text-right">Montant</TableHead>
            <TableHead>Échéance</TableHead>
            <TableHead>Statut</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {dettesRecentes.map((dette) => (
            <TableRow key={dette.id}>
              <TableCell className="font-medium">{dette.client}</TableCell>
              <TableCell className="text-right">{dette.montant.toLocaleString()} €</TableCell>
              <TableCell>{new Date(dette.dateEcheance).toLocaleDateString("fr-FR")}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    dette.statut === "En cours" ? "outline" : dette.statut === "En retard" ? "destructive" : "success"
                  }
                >
                  {dette.statut}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

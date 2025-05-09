"use client"

import { useState } from "react"
import Link from "next/link"
import { Plus, Search, Filter, ArrowUpDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Données fictives pour l'exemple
const dettes = [
  {
    id: "1",
    client: "Entreprise ABC",
    montant: 5000,
    dateCreation: "2024-01-15",
    dateEcheance: "2024-03-15",
    statut: "En cours",
  },
  {
    id: "2",
    client: "Société XYZ",
    montant: 3200,
    dateCreation: "2024-01-20",
    dateEcheance: "2024-02-20",
    statut: "En retard",
  },
  {
    id: "3",
    client: "Magasin 123",
    montant: 1800,
    dateCreation: "2024-02-01",
    dateEcheance: "2024-04-01",
    statut: "En cours",
  },
  {
    id: "4",
    client: "Boutique Mode",
    montant: 2500,
    dateCreation: "2024-02-10",
    dateEcheance: "2024-03-10",
    statut: "Payée",
  },
  {
    id: "5",
    client: "Restaurant Gourmet",
    montant: 1200,
    dateCreation: "2024-02-15",
    dateEcheance: "2024-03-15",
    statut: "En cours",
  },
]

export default function DettesPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredDettes = dettes.filter(
    (dette) => dette.client.toLowerCase().includes(searchTerm.toLowerCase()) || dette.id.includes(searchTerm),
  )

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Gestion des Dettes</h2>
        <Button asChild>
          <Link href="/dettes/ajouter">
            <Plus className="mr-2 h-4 w-4" />
            Nouvelle Dette
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Liste des Dettes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div className="flex w-full max-w-sm items-center space-x-2">
              <Input
                placeholder="Rechercher par client ou ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-xs"
              />
              <Button variant="outline" size="icon">
                <Search className="h-4 w-4" />
              </Button>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Filter className="mr-2 h-4 w-4" />
                  Filtrer
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Filtrer par statut</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Toutes les dettes</DropdownMenuItem>
                <DropdownMenuItem>En cours</DropdownMenuItem>
                <DropdownMenuItem>En retard</DropdownMenuItem>
                <DropdownMenuItem>Payées</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">ID</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead className="text-right">
                    <div className="flex items-center justify-end">
                      Montant
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead>Date de création</TableHead>
                  <TableHead>Échéance</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDettes.map((dette) => (
                  <TableRow key={dette.id}>
                    <TableCell className="font-medium">{dette.id}</TableCell>
                    <TableCell>{dette.client}</TableCell>
                    <TableCell className="text-right">{dette.montant.toLocaleString()} €</TableCell>
                    <TableCell>{new Date(dette.dateCreation).toLocaleDateString("fr-FR")}</TableCell>
                    <TableCell>{new Date(dette.dateEcheance).toLocaleDateString("fr-FR")}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          dette.statut === "En cours"
                            ? "outline"
                            : dette.statut === "En retard"
                              ? "destructive"
                              : "success"
                        }
                      >
                        {dette.statut}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            Actions
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Link href={`/dettes/${dette.id}`} className="w-full">
                              Voir les détails
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Link href={`/dettes/${dette.id}/modifier`} className="w-full">
                              Modifier
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem>Enregistrer un paiement</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">Supprimer</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

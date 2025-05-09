"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

interface Client {
  _id: string
  nom: string
  telephone: string
  lieu: string
  created_at: string
}

export default function AjouterDettePage({ params }: { params: { clientId: string } }) {
  const router = useRouter()
  const { clientId } = params
  const [isLoading, setIsLoading] = useState(false)
  const [client, setClient] = useState<Client | null>(null)
  const [formData, setFormData] = useState({
    produit: "",
    prix: "",
  })

  useEffect(() => {
    async function fetchClient() {
      try {
        const response = await fetch(`/api/clients/${clientId}`)

        if (!response.ok) {
          throw new Error("Client non trouvé")
        }

        const data = await response.json()
        setClient(data)
      } catch (error) {
        console.error("Erreur:", error)
        toast({
          title: "Erreur",
          description: "Client non trouvé",
          variant: "destructive",
        })
        router.push("/")
      }
    }

    fetchClient()
  }, [clientId, router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch(`/api/clients/${clientId}/dettes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          produit: formData.produit,
          prix: Number.parseFloat(formData.prix),
          paye: false, // Par défaut, la dette n'est pas payée
        }),
      })

      if (!response.ok) {
        throw new Error("Erreur lors de l'ajout de la dette")
      }

      toast({
        title: "Dette ajoutée avec succès",
        description: `Dette de ${formData.prix} FCFA ajoutée pour ${client?.nom}.`,
      })

      router.push(`/client/${clientId}`)
      router.refresh()
    } catch (error) {
      console.error("Erreur:", error)
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'ajout de la dette.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (!client) {
    return <div className="container mx-auto px-4 py-8 text-center">Chargement...</div>
  }

  return (
    <div className="container mx-auto px-4 py-4 sm:py-8">
      <div className="mb-4 sm:mb-6">
        <Button variant="outline" asChild size="sm" className="mb-4">
          <Link href={`/client/${clientId}`}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour
          </Link>
        </Button>
      </div>

      <Card className="max-w-md mx-auto">
        <CardHeader className="px-4 sm:px-6">
          <CardTitle className="text-lg sm:text-xl">
            Ajouter une dette pour <span className="line-clamp-1">{client.nom}</span>
          </CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4 px-4 sm:px-6">
            <div className="space-y-2">
              <Label htmlFor="produit">Nom du produit</Label>
              <Input
                id="produit"
                name="produit"
                value={formData.produit}
                onChange={handleChange}
                required
                placeholder="Nom du produit"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="prix">Prix (FCFA)</Label>
              <Input
                id="prix"
                name="prix"
                type="number"
                value={formData.prix}
                onChange={handleChange}
                required
                placeholder="0"
              />
            </div>
            <p className="text-sm text-gray-500">Date et heure: {new Date().toLocaleString()}</p>
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row justify-between gap-2 px-4 sm:px-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              disabled={isLoading}
              className="w-full sm:w-auto order-2 sm:order-1"
            >
              Annuler
            </Button>
            <Button type="submit" disabled={isLoading} className="w-full sm:w-auto order-1 sm:order-2">
              {isLoading ? "Enregistrement..." : "Enregistrer"}
            </Button>
          </CardFooter>
        </form>
      </Card>
      <Toaster />
    </div>
  )
}

"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function InitDb() {
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState("")

  const initializeDatabase = async () => {
    setIsLoading(true)
    setMessage("Initialisation de la base de données...")

    try {
      // Création de la table clients
      const { error: clientsError } = await supabase.rpc("create_clients_table")

      if (clientsError && !clientsError.message.includes("already exists")) {
        throw clientsError
      }

      // Création de la table dettes
      const { error: dettesError } = await supabase.rpc("create_dettes_table")

      if (dettesError && !dettesError.message.includes("already exists")) {
        throw dettesError
      }

      setMessage("Base de données initialisée avec succès!")
    } catch (error) {
      console.error("Erreur:", error)
      setMessage(`Erreur: ${error instanceof Error ? error.message : "Une erreur est survenue"}`)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Initialisation de la base de données</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4">
          Cliquez sur le bouton ci-dessous pour créer les tables nécessaires dans votre base de données Supabase.
        </p>
        <Button onClick={initializeDatabase} disabled={isLoading}>
          {isLoading ? "Initialisation..." : "Initialiser la base de données"}
        </Button>
        {message && <p className="mt-4">{message}</p>}
      </CardContent>
    </Card>
  )
}

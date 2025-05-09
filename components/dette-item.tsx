"use client"

import { useState } from "react"
import { TableCell, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { useRouter } from "next/navigation"
import { toast } from "@/components/ui/use-toast"

interface DetteItemProps {
  dette: {
    _id: string
    produit: string
    prix: number
    paye: boolean
    created_at: string
  }
  clientId: string
}

export function DetteItem({ dette, clientId }: DetteItemProps) {
  const router = useRouter()
  const [isPaye, setIsPaye] = useState(dette.paye)
  const [isLoading, setIsLoading] = useState(false)

  const handlePayeChange = async () => {
    setIsLoading(true)
    const newPayeStatus = !isPaye

    try {
      const response = await fetch(`/api/dettes/${dette._id}/paiement`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ paye: newPayeStatus }),
      })

      if (!response.ok) {
        throw new Error("Erreur lors de la mise à jour du statut de paiement")
      }

      setIsPaye(newPayeStatus)
      toast({
        title: newPayeStatus ? "Dette marquée comme payée" : "Dette marquée comme non payée",
        description: `${dette.produit} - ${dette.prix.toLocaleString()} FCFA`,
      })

      // Rafraîchir la page pour mettre à jour le total
      router.refresh()
    } catch (error) {
      console.error("Erreur:", error)
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la mise à jour du statut de paiement.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <TableRow className={isPaye ? "bg-gray-50" : ""}>
      <TableCell className={`font-medium ${isPaye ? "line-through text-gray-500" : ""}`}>{dette.produit}</TableCell>
      <TableCell className={`text-right ${isPaye ? "line-through text-gray-500" : ""}`}>
        {dette.prix.toLocaleString()}
      </TableCell>
      <TableCell className={`hidden sm:table-cell ${isPaye ? "text-gray-500" : ""}`}>
        {new Date(dette.created_at).toLocaleString()}
      </TableCell>
      <TableCell className="text-center">
        <div className="flex justify-center items-center">
          <Checkbox
            checked={isPaye}
            onCheckedChange={handlePayeChange}
            disabled={isLoading}
            className="data-[state=checked]:bg-green-500 data-[state=checked]:text-white"
            aria-label={isPaye ? "Marquer comme non payé" : "Marquer comme payé"}
          />
        </div>
      </TableCell>
    </TableRow>
  )
}

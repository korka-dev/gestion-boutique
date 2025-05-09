import { Suspense } from "react"
import Link from "next/link"
import { User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import ClientsList from "@/components/clients-list"

export const revalidate = 0

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-4 sm:py-8">
      <header className="mb-4 sm:mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-2xl sm:text-3xl font-bold">Diallo_boutique</h1>
          <div className="flex">
            <Button asChild className="w-full sm:w-auto">
              <Link href="/ajouter-client">
                <User className="mr-2 h-4 w-4" />
                Ajouter un client
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <Card>
        <CardHeader className="px-4 sm:px-6">
          <CardTitle className="text-lg sm:text-xl">Liste des clients et leurs dettes</CardTitle>
        </CardHeader>
        <CardContent className="px-4 sm:px-6">
          <Suspense fallback={<div className="py-8 text-center">Chargement des clients...</div>}>
            <ClientsList />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  )
}

import InitDb from "@/scripts/init-db"

export default function InitDbPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Configuration de la base de données</h1>
      <InitDb />
    </div>
  )
}

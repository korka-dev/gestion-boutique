import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Client = {
  id: string
  nom: string
  telephone: string
  lieu: string
  created_at: string
}

export type Dette = {
  id: string
  client_id: string
  produit: string
  prix: number
  created_at: string
}

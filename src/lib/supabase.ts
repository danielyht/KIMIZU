import { createClient, type SupabaseClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined

export const isSupabaseConfigured = Boolean(url && anonKey)

/** Cliente tipado. Null se as variáveis de ambiente não estiverem configuradas. */
export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(url!, anonKey!)
  : null

export type ProductRow = {
  id: string
  name: string
  category: string
  price: number
  short_description: string
  description: string
  image: string | null
  tag: string | null
  variants: unknown
  sort_order: number
  created_at?: string
  updated_at?: string
}

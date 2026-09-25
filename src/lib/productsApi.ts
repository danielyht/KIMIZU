import {
  type Product,
  type ProductCategoryId,
  type ProductTag,
  type ProductVariantGroup,
  products as seedProducts,
} from '../data/products'
import { isSupabaseConfigured, supabase, type ProductRow } from './supabase'

function parseVariants(value: unknown): ProductVariantGroup[] | undefined {
  if (!Array.isArray(value) || value.length === 0) return undefined
  return value as ProductVariantGroup[]
}

export function rowToProduct(row: ProductRow): Product {
  return {
    id: row.id,
    name: row.name,
    category: row.category as ProductCategoryId,
    price: Number(row.price),
    shortDescription: row.short_description,
    description: row.description,
    image: row.image ?? undefined,
    tag: (row.tag as ProductTag | null) ?? undefined,
    variants: parseVariants(row.variants),
  }
}

export function productToRow(
  product: Product,
  sortOrder = 0,
): Omit<ProductRow, 'created_at' | 'updated_at'> {
  return {
    id: product.id,
    name: product.name,
    category: product.category,
    price: product.price,
    short_description: product.shortDescription,
    description: product.description,
    image: product.image ?? null,
    tag: product.tag ?? null,
    variants: product.variants ?? [],
    sort_order: sortOrder,
  }
}

/** Gera um id amigável a partir do nome (slug). */
export function slugify(name: string) {
  return name
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 64)
}

export async function fetchProducts(): Promise<Product[]> {
  if (!supabase) return seedProducts

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('sort_order', { ascending: true })
    .order('name', { ascending: true })

  if (error) {
    console.error('Erro ao buscar produtos:', error.message)
    return seedProducts
  }

  if (!data || data.length === 0) return seedProducts
  return (data as ProductRow[]).map(rowToProduct)
}

export async function createProduct(product: Product, sortOrder = 0) {
  if (!supabase) throw new Error('Supabase não configurado.')
  const row = productToRow(product, sortOrder)
  const { data, error } = await supabase.from('products').insert(row).select().single()
  if (error) throw new Error(error.message)
  return rowToProduct(data as ProductRow)
}

export async function updateProduct(product: Product, sortOrder?: number) {
  if (!supabase) throw new Error('Supabase não configurado.')
  const row = productToRow(product, sortOrder ?? 0)
  const { data, error } = await supabase.from('products').update(row).eq('id', product.id).select().single()
  if (error) throw new Error(error.message)
  return rowToProduct(data as ProductRow)
}

export async function deleteProduct(id: string) {
  if (!supabase) throw new Error('Supabase não configurado.')
  const { error } = await supabase.from('products').delete().eq('id', id)
  if (error) throw new Error(error.message)
}

export { isSupabaseConfigured, seedProducts }

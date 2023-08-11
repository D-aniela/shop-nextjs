import { Product } from '@/models'
import { db } from '.'
import { IProduct } from '@/interfaces'

export const getProductsBySlug = async (
  slug: string,
): Promise<IProduct | null> => {
  await db.connect()
  const product = await Product.findOne({ slug })
  await db.disconnect()

  if (!product) {
    return null
  }

  return JSON.parse(JSON.stringify(product))
}

import { db } from '@/database'
import { IProduct } from '@/interfaces'
import { Product } from '@/models'
import mongoose from 'mongoose'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = { message: string } | IProduct

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  switch (req.method) {
    case 'GET':
      return getProduct(req, res)

    default:
      return res.status(400).json({ message: 'Método no existe ' + req.method })
  }
}

const getProduct = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { slug } = req.query

    await db.connect()
    const entry = await Product.findOne({ slug }).lean()

    if (!entry) {
      await db.disconnect()
      return res
        .status(400)
        .json({ message: ' No hay entrada con ese ID: ' + slug })
    }

    res.status(200).json(entry!)
  } catch (error: any) {
    console.log({ error })
    await db.disconnect()
    res.status(400).json({ message: error.errors.status.message })
  }
}

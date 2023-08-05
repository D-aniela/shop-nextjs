import { IProduct } from '@/interfaces'
import { Card, CardActionArea, CardMedia, Grid } from '@mui/material'
import { FC } from 'react'
import ProductCard from './ProductCard'

interface Props {
  products: IProduct[]
}

const ProductList: FC<Props> = ({ products }) => {
  return (
    <Grid container spacing={4}>
      {products.map((p) => (
        <ProductCard key={p.slug} product={p} />
      ))}
    </Grid>
  )
}

export default ProductList

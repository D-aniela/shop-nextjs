import { NextPage } from 'next'
import { Typography } from '@mui/material'

import { ShopLayout } from '@/components/layout'
import ProductList from '@/components/products/ProductList'
import { useProducts } from '@/hooks'
import { FullScreenLoading } from '@/components/ui'

const MenPage: NextPage = () => {
  const { products, isLoading } = useProducts('/products?gender=men')

  return (
    <ShopLayout
      title={'Teslo-Shop - Men'}
      pageDescription={'Encuentra los mejores productos de Teslo para hombres'}
    >
      <Typography variant='h1' component='h1'>
        Hombres
      </Typography>
      <Typography variant='h2' sx={{ marginBottom: 1 }}>
        Productos para hombres
      </Typography>

      {isLoading ? (
        <h1>
          <FullScreenLoading />
        </h1>
      ) : (
        <ProductList products={products} />
      )}
    </ShopLayout>
  )
}

export default MenPage

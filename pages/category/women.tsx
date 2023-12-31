import { NextPage } from 'next'
import { Typography } from '@mui/material'

import { ShopLayout } from '@/components/layout'
import ProductList from '@/components/products/ProductList'
import { useProducts } from '@/hooks'
import { FullScreenLoading } from '@/components/ui'

const WomenPage: NextPage = () => {
  const { products, isLoading } = useProducts('/products?gender=women')

  return (
    <ShopLayout
      title={'Teslo-Shop - Women'}
      pageDescription={'Encuentra los mejores productos de Teslo para mujeres'}
    >
      <Typography variant='h1' component='h1'>
        Mujeres
      </Typography>
      <Typography variant='h2' sx={{ marginBottom: 1 }}>
        Productos para mujeres
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

export default WomenPage

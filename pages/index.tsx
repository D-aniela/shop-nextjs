import { NextPage } from 'next'
import { Typography } from '@mui/material'

import { ShopLayout } from '@/components/layout'
import ProductList from '@/components/products/ProductList'
import { useProducts } from '@/hooks'
import { FullScreenLoading } from '@/components/ui'

const HomePage: NextPage = () => {
  const { products, isLoading } = useProducts('/products')

  return (
    <ShopLayout
      title={'Teslo-Shop - Home'}
      pageDescription={'Encuentra los mejores productos de Teslo aqui'}
    >
      <Typography variant='h1' component='h1'>
        Tienda
      </Typography>
      <Typography variant='h2' sx={{ marginBottom: 1 }}>
        Todos los productos
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

export default HomePage

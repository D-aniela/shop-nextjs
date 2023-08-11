import { NextPage, GetServerSideProps } from 'next'
import { Typography } from '@mui/material'

import { ShopLayout } from '@/components/layout'
import ProductList from '@/components/products/ProductList'
import { dbProducts } from '@/database'
import { IProduct } from '@/interfaces'

interface Props {
  products: IProduct[]
}

const SearchPage: NextPage<Props> = ({ products }) => {
  return (
    <ShopLayout
      title={'Teslo-Shop - Search'}
      pageDescription={'Encuentra los mejores productos de Teslo aqui'}
    >
      <Typography variant='h1' component='h1'>
        Buscar producto
      </Typography>
      <Typography variant='h2' sx={{ marginBottom: 1 }}>
        ABC --- 123
      </Typography>

      <ProductList products={products} />
    </ShopLayout>
  )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { query = '' } = params as { query: string }
  if (query.length === 0) {
    return {
      redirect: {
        destination: '/',
        permanent: true,
      },
    }
  }

  let products = await dbProducts.getProductsByTerm(query)

  return {
    props: { products },
  }
}

export default SearchPage

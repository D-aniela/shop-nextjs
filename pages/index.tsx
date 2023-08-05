import {
  Card,
  CardActionArea,
  CardMedia,
  Grid,
  Typography,
} from '@mui/material'

import { ShopLayout } from '@/components/layout'
import { initialData } from '@/database/products'

export default function Home() {
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

      <Grid container spacing={4}>
        {initialData.products.map((p) => (
          <Grid item xs={6} sm={4} key={p.slug}>
            <Card>
              <CardActionArea>
                <CardMedia
                  component='img'
                  image={`products/${p.images[0]}`}
                  alt={p.title}
                />
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </ShopLayout>
  )
}

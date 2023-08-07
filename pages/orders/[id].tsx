import { CarList } from '@/components/cart'
import { ShopLayout } from '@/components/layout'
import { OrderSummary } from '../../components/cart/OrderSummary'
import NextLink from 'next/link'
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
  Link,
  Chip,
} from '@mui/material'
import { CreditCardOutlined, CreditScoreOutlined } from '@mui/icons-material'

const OrderPage = () => {
  return (
    <ShopLayout
      title='Resumen de la orden ABC123'
      pageDescription='Resumen de la orden'
    >
      <Typography variant='h1' component='h1'>
        Orden: ABC123
      </Typography>

      {/* <Chip
        sx={{ my: 2 }}
        label='Pendiente de pago'
        variant='outlined'
        color='error'
        icon={<CreditCardOutlined />}
      /> */}

      <Chip
        sx={{ my: 2 }}
        label='Pagada'
        variant='outlined'
        color='success'
        icon={<CreditScoreOutlined />}
      />

      <Grid container>
        <Grid item xs={12} sm={7}>
          <CarList />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Card className='summary-card'>
            <CardContent>
              <Typography variant='h1'>Resumen (3 productos)</Typography>

              <Divider sx={{ my: 1 }} />

              <Box display='flex' justifyContent='space-between'>
                <NextLink href='/checkout/address' passHref>
                  <Link component='span' underline='always'>
                    Editar
                  </Link>
                </NextLink>
              </Box>

              <Typography variant='subtitle1'>Dirección de entrega</Typography>
              <Typography>Laura Daniela</Typography>
              <Typography>111 Lugar</Typography>
              <Typography>Ciudad, 1023</Typography>
              <Typography>País</Typography>
              <Typography>123 456 98123</Typography>

              <Divider sx={{ my: 1 }} />

              <Box display='flex' justifyContent='end'>
                <NextLink href='/cart' passHref>
                  <Link component='span' underline='always'>
                    Editar
                  </Link>
                </NextLink>
              </Box>

              <OrderSummary />

              <Box sx={{ mt: 3 }}>
                {/* <Button color='secondary' className='circular-btn' fullWidth> */}
                Pagar
                {/* </Button> */}
              </Box>
              <Chip
                sx={{ my: 2 }}
                label='Orden ya fue pagada'
                variant='outlined'
                color='success'
                icon={<CreditScoreOutlined />}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  )
}

export default OrderPage

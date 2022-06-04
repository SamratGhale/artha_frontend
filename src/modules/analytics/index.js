// material
import { Container, Grid } from '@mui/material';
// hooks
// components
import Page from '../../components/Page';
import {
  EcommerceProductSold,
  EcommerceSalesProfit,
  EcommerceYearlySales,
  EcommerceTotalBalance,
  EcommerceSaleByGender,
  EcommerceSalesOverview,
  EcommerceCurrentBalance
} from '../../components/_dashboard/general-ecommerce';

// ----------------------------------------------------------------------

export default function Analytics() {

  return (
    <Page title="General: E-commerce | Minimal-UI">
      <Container sx={{mt:5}} maxWidth={false}>
        <Grid container spacing={3}>

          <Grid item xs={12} md={4}>
            <EcommerceProductSold />
          </Grid>
          <Grid item xs={12} md={4}>
            <EcommerceTotalBalance />
          </Grid>
          <Grid item xs={12} md={4}>
            <EcommerceSalesProfit />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <EcommerceSaleByGender />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <EcommerceYearlySales />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <EcommerceSalesOverview />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <EcommerceCurrentBalance />
          </Grid>

        </Grid>
      </Container>
    </Page>
  );
}

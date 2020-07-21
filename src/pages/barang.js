import React from 'react';

import Layout from '../components/layout';
import SEO from '../components/seo';
import BarangTable from '../components/barang_table';
import StokCard from '../components/barang_card';
import LastUpdatedCard from '../components/barang_last_updated';

import Grid from '@material-ui/core/Grid';

export default () => (
  <Layout>
    <SEO title="Toko Ceunah" />
    <Grid container spacing={3}>
      <Grid item xs>
        <StokCard />
        <LastUpdatedCard />
      </Grid>
    </Grid>
    <BarangTable />
  </Layout>
);

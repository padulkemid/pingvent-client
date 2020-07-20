import React from 'react';

import Layout from '../components/layout';
import SEO from '../components/seo';
import Chart from '../components/chart';
import TabelBarang from '../components/tabel_barang';
import BarangCard from '../components/barang_card';

import Grid from '@material-ui/core/Grid';

const IndexPage = () => {
  return (
    <Layout>
      <SEO title="Dashboard" />
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <BarangCard />
        </Grid>
        <Grid item xs={6}>
          <BarangCard type="status" />
        </Grid>
        <Grid item xs={12}>
          <Chart />
        </Grid>
      </Grid>
      <TabelBarang />
    </Layout>
  );
};

export default IndexPage;

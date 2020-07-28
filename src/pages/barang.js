import React, { useEffect } from 'react';

import { navigate } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';
import BarangTable from '../components/barang_table';
import StokCard from '../components/barang_card';
import LastUpdatedCard from '../components/barang_last_updated';
import AddForm from '../components/barang_add_form';

import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';

export default () => {
  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/login');
    }
  }, []);

  return (
    <Layout>
      <SEO title="Toko Ceunah" />
      <Grid container spacing={3}>
        <Grid item xs={12} sm={7} lg={8}>
          <AddForm />
        </Grid>
        <Grid item xs={12} sm={5} lg={4}>
          <StokCard />
          <Box mt={5.5}>
            <LastUpdatedCard />
          </Box>
        </Grid>
      </Grid>
      <Divider />
      <BarangTable />
    </Layout>
  );
};

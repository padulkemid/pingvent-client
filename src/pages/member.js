import React from 'react';

import Layout from '../components/layout';
import SEO from '../components/seo';
import UserTable from '../components/user_table';
import UserChart from '../components/user_chart';

import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';

export default () => {
  return (
    <Layout>
      <SEO title="User List Toko Ceunah" />
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <UserChart type="user" />
        </Grid>
        <Grid item xs={12} md={6}>
          <UserChart type="seller" />
        </Grid>
      </Grid>
      <Divider />
      <UserTable />
    </Layout>
  );
};

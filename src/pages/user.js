import React from 'react';

import Layout from '../components/layout';
import SEO from '../components/seo';
import UserTable from '../components/user_table';

export default () => {
  return (
    <Layout>
      <SEO title="User List Toko Ceunah" />
      <UserTable />
    </Layout>
  );
};

import React from 'react';

// @material-ui core
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

// mui-datatables
import DataTable from 'mui-datatables';

const columns = ['ID', 'Nama', 'Harga', 'Stok', 'Vendor', 'Dibuat', 'Diubah'];

const dataIn = [
  [
    1,
    'Asus RX 580 ROG Strix',
    'Rp 4.777.500,00',
    2,
    'Toko Ceunah',
    '29 Mei 2020 17:30',
    '1 Juli 2020 12:45',
  ],
  [
    2,
    'Cooler Master MasterWatt 550W PSU 80+',
    'Rp 1.230.000,00',
    8,
    'Toko Jancuk',
    '29 Mei 2020 17:30',
    '1 Juli 2020 12:45',
  ],
  [
    3,
    'LG 24MK600M',
    'Rp 2.500.000,00',
    6,
    'Toko Ajin',
    '29 Mei 2020 17:30',
    '1 Juli 2020 12:45',
  ],
  [
    4,
    'Armageddon Pixxel+',
    'Rp 2.777.500,00',
    2,
    'Toko Bule',
    '29 Mei 2020 17:30',
    '1 Juli 2020 12:45',
  ],
  [
    5,
    'AMD Ryzen 5',
    'Rp 3.000.000,00',
    10,
    'Toko Habred',
    '29 Mei 2020 17:30',
    '1 Juli 2020 12:45',
  ],
];

const dataOut = [
  [
    1,
    'Asus RX 580 ROG Strix',
    'Rp 4.777.500,00',
    2,
    'Toko Ceunah',
    '29 Mei 2020 17:30',
    '1 Juli 2020 12:45',
  ],
  [
    2,
    'Cooler Master MasterWatt 550W PSU 80+',
    'Rp 1.230.000,00',
    8,
    'Toko Jancuk',
    '29 Mei 2020 17:30',
    '1 Juli 2020 12:45',
  ],
  [
    3,
    'LG 24MK600M',
    'Rp 2.500.000,00',
    6,
    'Toko Ajin',
    '29 Mei 2020 17:30',
    '1 Juli 2020 12:45',
  ],
  [
    4,
    'Armageddon Pixxel+',
    'Rp 2.777.500,00',
    2,
    'Toko Bule',
    '29 Mei 2020 17:30',
    '1 Juli 2020 12:45',
  ],
  [
    5,
    'AMD Ryzen 5',
    'Rp 3.000.000,00',
    10,
    'Toko Habred',
    '29 Mei 2020 17:30',
    '1 Juli 2020 12:45',
  ],
];

const options = {
  elevation: 3,
  selectableRows: 'single',
};

// styles
const useStyles = makeStyles((theme) => ({
  in: {
    color: theme.palette.secondary.main,
    backgroundColor: theme.palette.primary.main,
    '& td': {
      backgroundColor: theme.palette.primary.dark,
      color: 'white',
    },
    '& p': {
      color: 'white',
    },
    '& #pagination-rows': {
      color: 'white',
    },
  },
  out: {
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.secondary.main,
    '& td': {
      backgroundColor: theme.palette.secondary.light,
    },
  },
}));

export default () => {
  const classes = useStyles();

  return (
    <Box mb={8}>
      <Grid container spacing={4}>
        <Grid item xs>
          <DataTable
            title={'Status Barang Masuk'}
            data={dataIn}
            columns={columns}
            className={classes.in}
            options={options}
          />
        </Grid>
        <Grid item xs>
          <DataTable
            title={'Status Barang Keluar'}
            data={dataOut}
            columns={columns}
            className={classes.out}
            options={options}
          />
        </Grid>
      </Grid>
    </Box>
  );
};


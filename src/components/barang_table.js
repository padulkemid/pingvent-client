import React, { useState } from 'react';

// @material-ui core
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

// mui-datatables
import DataTable from 'mui-datatables';

export default () => {
  // dialog states
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(false);

  // form states
  const [id, setId] = useState('');
  const [nama, setNama] = useState('');
  const [harga, setHarga] = useState(0);
  const [stok, setStok] = useState(0);
  const [vendor, setVendor] = useState('');

  const columns = [
    'ID',
    'Nama',
    'Harga',
    'Stok',
    'Vendor',
    'Dibuat',
    'Diubah',
    {
      name: 'Menu',
      options: {
        filter: false,
        customBodyRender: (value, tableMeta, updateValue) => (
          <Box m={2}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={() => handleOpen(tableMeta)}>
              Edit Barang
            </Button>
          </Box>
        ),
      },
    },
  ];

  const data = [
    [
      'a123098-12387-aksd719',
      'WDC SATA III Blue 1 TB',
      'Rp 2,000,000.00',
      10,
      'Toko Jadah',
      '12 Juli 2020 03:12',
      '15 Juli 2020 10:43',
    ],
    [
      'a123098-12387-aksd719',
      'WDC SATA II Blue 2 TB',
      'Rp 2,000,000.00',
      10,
      'Toko Jadah',
      '12 Juli 2020 03:12',
      '15 Juli 2020 10:43',
    ],
    [
      'a123098-12387-aksd719',
      'WDC SATA I Blue 5 TB',
      'Rp 2,000,000.00',
      10,
      'Toko Jadah',
      '12 Juli 2020 03:12',
      '15 Juli 2020 10:43',
    ],
  ];

  const options = {
    elevation: 4,
    onRowsDelete: ({ data }) => {
      // TODO: delete index here

      return false;
    },
  };

  const handleOpen = (meta) => {
    setOpen(true);
    console.log(meta);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Box mb={6}>
        <DataTable
          title={'List Barang Toko Ceunah'}
          data={data}
          columns={columns}
          options={options}
        />
      </Box>
      <Dialog open={open} onClose={handleClose} aria-labelledby="alert">
        <DialogTitle id="alert">Ceunah ?</DialogTitle>
        <DialogContent>
          <DialogContentText>Dasar jancok</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="error">
            Tutup
          </Button>
          <Button onClick={handleClose} color="primary">
            Setuju
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

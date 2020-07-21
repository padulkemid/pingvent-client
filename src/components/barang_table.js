import React, { useState } from 'react';

import BarangEdit from '../components/barang_edit_form';

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

// helper
import { dateFormatToday } from '../utils/helper';

export default () => {
  // dialog states
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  // useEffect inside props
  // TODO: refactor this T_T
  const [formData, setFormData] = useState(['', '', 0, 0, '']);

  const columns = [
    'ID',
    'Nama',
    {
      name: 'Harga',
      options: {
        filter: true,
        customBodyRender: (value) =>
          new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
          }).format(value),
      },
    },
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
              onClick={() => handleFormOpen(tableMeta)}>
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
      2000000,
      10,
      'Toko Jadah',
      '12 Juli 2020 03:12',
      '15 Juli 2020 10:43',
    ],
    [
      'a123098-12387-aksd719',
      'WDC SATA II Blue 2 TB',
      600000,
      10,
      'Toko Jadah',
      '12 Juli 2020 03:12',
      '15 Juli 2020 10:43',
    ],
    [
      'a123098-12387-aksd719',
      'WDC SATA I Blue 5 TB',
      700000,
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
      // use newTableData as the 2nd params
      // to get newly refreshed data after
      // delete
      handleDelete(data);
      return false;
    },
    downloadOptions: {
      filename: `List Barang ${dateFormatToday()}`,
    },
  };

  const handleDelete = (data) => {
    console.log(data);
    setDeleteAlert(true);
  };

  const handleAlertClose = () => {
    setDeleteAlert(false);
  };

  const handleFormOpen = ({ rowData }) => {
    // meta carries data index
    // TODO: insert data change here
    setFormOpen(true);
    setFormData(rowData);
  };

  return (
    <>
      <Box mb={6} mt={3}>
        <DataTable
          title={'List Barang Toko Ceunah'}
          data={data}
          columns={columns}
          options={options}
        />
      </Box>
      {/* delete alert dialog */}
      <Dialog
        open={deleteAlert}
        onClose={handleAlertClose}
        aria-labelledby="alert">
        <DialogTitle id="alert">
          Apakah anda yakin ingin menghapus data ?
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Aksi ini tidak dapat dikembalikan!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAlertClose} style={{ color: 'red' }}>
            Tutup
          </Button>
          <Button onClick={handleAlertClose} color="primary">
            Hapus
          </Button>
        </DialogActions>
      </Dialog>
      <BarangEdit
        open={formOpen}
        formClose={(bool) => setFormOpen(bool)}
        formData={formData}
      />
    </>
  );
};

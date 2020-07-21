import React, { useState } from 'react';

import UserEdit from '../components/user_edit_form';

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
  const [formData, setFormData] = useState(['', '', '', '', '', '', '', '']);

  const columns = [
    'ID',
    'Username',
    'Nama',
    'Email',
    'Phone',
    {
      name: 'Role',
      options: {
        filter: true,
        customBodyRender: (value) => {
          const capitalize = value[0].toUpperCase() + value.slice(1);
          return capitalize;
        },
      },
    },
    'Alamat',
    'Location',
    'Login Terakhir',
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
              Edit
            </Button>
          </Box>
        ),
      },
    },
  ];

  const data = [
    [
      'a3ecf919-c2a7-46e0-be6e-f11ef5d49ae7',
      'titit',
      'Titit Kadal',
      'titit@gmail.com',
      '+6285188760989',
      'user',
      'Jln. Ceunah',
      '-6.780, 123.08',
      '25 Juli 2020 10:34',
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
      filename: `List User ${dateFormatToday()}`,
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
          title={'List Semua User'}
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
      <UserEdit
        open={formOpen}
        formClose={(bool) => setFormOpen(bool)}
        formData={formData}
      />
    </>
  );
};


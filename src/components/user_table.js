import React, { useState, useEffect } from 'react';

import UserEdit from '../components/user_edit_form';

// @material-ui core
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

// mui-datatables
import DataTable from 'mui-datatables';

// @apollo/react-hooks
import { useQuery, useMutation } from '@apollo/react-hooks';
import { LIST_USER, DELETE_USER } from '../services/schema';

// helper
import { dateFormatToday } from '../utils/helper';

export default () => {
  // user queries
  const { data: listUser } = useQuery(LIST_USER);
  const [data, setData] = useState([]);
  const [deleteIds, setDeleteIds] = useState([]);

  // dialog states
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [formOpen, setFormOpen] = useState(false);

  // mau nangis liatnya
  // TODO: refactor this T_T
  const [formData, setFormData] = useState(['', '', '', '', '', '', '', '']);

  // delete states
  const [hapusOrang] = useMutation(DELETE_USER);
  const [loading, setLoading] = useState(false);

  const columns = [
    {
      name: 'ID',
      options: {
        filter: true,
        display: 'false',
      },
    },
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
    'Diubah',
    'Login Terakhir',
    {
      name: 'Menu',
      options: {
        download: false,
        print: false,
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

  const options = {
    elevation: 4,
    responsive: 'standard',

    // disable user print and export to csv
    download: false,
    print: false,
    onRowsDelete: ({ data }) => {
      handleAlertOpen(data);
      return false;
    },
    downloadOptions: {
      filename: `List User ${dateFormatToday()}.csv`,
    },
  };

  const deleteOrang = async () => {
    try {
      for (let i = 0; i < deleteIds.length; i++) {
        await hapusOrang({
          variables: {
            id: deleteIds[i],
          },
        });

        setTimeout(() => {
          setLoading(false);
          setDeleteAlert(false);
          window.location.reload();
        }, 2000);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleDelete = () => {
    setLoading(true);
    deleteOrang();
  };

  const handleAlertOpen = (dataIndex) => {
    // first map: get new array based on dataindexes
    const idx = dataIndex.map((el) => el.dataIndex);

    // second map: get new array based on data array
    // with indexes from above
    const dataWithIdx = idx.map((el) => data[el][0]);

    setDeleteIds(dataWithIdx);
    setDeleteAlert(true);
  };

  const handleAlertClose = () => {
    setDeleteAlert(false);
  };

  const handleFormOpen = ({ rowData }) => {
    setFormOpen(true);
    setFormData(rowData);
  };

  useEffect(() => {
    if (listUser) {
      const { semuaUser } = listUser;

      // filter shit (not an admin then fuck off)
      const tempData = [];
      for (let i = 0; i < semuaUser.length; i++) {
        if (semuaUser[i].role === 'admin') {
          continue;
        } else {
          tempData.push(semuaUser[i]);
        }
      }

      const data = tempData.map((el) => [
        el.id,
        el.username,
        el.nama,
        el.email,
        el.phone,
        el.role,
        el.address,
        el.latlng,
        el.updatedAt,
        el.lastLoginAt,
      ]);

      setData(data);
    }
  }, [listUser]);

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
          {loading ? (
            <CircularProgress size={19} style={{ marginRight: '1%' }} />
          ) : (
            <Button onClick={handleAlertClose} style={{ color: 'red' }}>
              Tutup
            </Button>
          )}
          <Button
            disabled={loading ? true : false}
            onClick={handleDelete}
            color="primary">
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

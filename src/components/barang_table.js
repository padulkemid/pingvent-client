import React, { useState, useEffect } from 'react';

import BarangEdit from '../components/barang_edit_form';

// @material-ui core
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';

// mui-datatables
import DataTable from 'mui-datatables';

// helper
import { dateFormatToday } from '../utils/helper';

// @apollo/react-hooks
import { useQuery, useMutation } from '@apollo/react-hooks';
import { LIST_BARANG, HAPUS_BARANG } from '../services/schema';

// utils
import { Alert } from '../utils/helper';

const useStyles = makeStyles((theme) => ({
  deleteProgress: {
    marginRight: theme.spacing(1),
  },
}));

export default () => {
  const classes = useStyles();

  // get data
  const { data: listBarang } = useQuery(LIST_BARANG);
  const [data, setData] = useState([]);

  // dialog states
  const [hapusBarang] = useMutation(HAPUS_BARANG);
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [formOpen, setFormOpen] = useState(false);

  // delete data state
  const [deleteIds, setDeleteIds] = useState([]);

  // form states
  // TODO: refactor this T_T
  // TODO: menangis
  const [formData, setFormData] = useState(['', '', 0, 0, '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const columns = [
    {
      name: 'ID',
      options: {
        filter: true,
        display: 'false',
      },
    },
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
    'Seller',
    'Dibuat',
    'Diubah',
    {
      name: 'Menu',
      options: {
        filter: false,
        download: false,
        print: false,
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
    onRowsDelete: ({ data }) => {
      handleAlertOpen(data);

      // page is refreshed since it wasn't SPA optimized
      // kinda lazy to do that after all of this data scattering T_T
      return false;
    },
    downloadOptions: {
      filename: `List Barang ${dateFormatToday()}.csv`,
    },
  };

  const deleteBarang = async () => {
    try {
      for (let i = 0; i < deleteIds.length; i++) {
        await hapusBarang({
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
      setError(true);
    }
  };

  const handleDelete = () => {
    setLoading(true);
    deleteBarang();
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

  const handleSnackbarClose = (_, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setError(false);
  };

  const handleFormOpen = ({ rowData }) => {
    // meta carries data index
    // TODO: insert data change here
    setFormOpen(true);
    setFormData(rowData);
  };

  useEffect(() => {
    if (listBarang) {
      const { semuaBarang } = listBarang;
      const data = semuaBarang.map((el) => [
        el.id,
        el.nama,
        el.harga,
        el.stock,
        el.vendor,
        el.createdAt,
        el.updatedAt,
      ]);

      setData(data);
    }
  }, [listBarang]);

  return (
    <>
      <Box mb={6} mt={3}>
        <DataTable
          title={'List Barang'}
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
            <CircularProgress size={25} className={classes.deleteProgress} />
          ) : (
            <Button onClick={handleAlertClose} style={{ color: 'red' }}>
              Batalkan
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
      <Snackbar
        open={error}
        autoHideDuration={1500}
        onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity="error">
          Terjadi kesalahan pada sistem!
        </Alert>
      </Snackbar>
      <BarangEdit
        open={formOpen}
        formClose={(bool) => setFormOpen(bool)}
        formData={formData}
      />
    </>
  );
};

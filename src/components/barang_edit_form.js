import React, { useState, useEffect } from 'react';

// @material-ui core
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';

// @apollo/react-hooks
import { useMutation } from '@apollo/react-hooks';
import { EDIT_BARANG } from '../services/schema';

// utils
import { Alert } from '../utils/helper';

const useStyles = makeStyles((theme) => ({
  editProgress: {
    marginRight: theme.spacing(1),
  },
}));

export default ({ open, formClose, formData }) => {
  const classes = useStyles();

  // mutation states
  const [editBarang] = useMutation(EDIT_BARANG);

  // falseData states
  const [falseData, setFalseData] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertContent, setAlertContent] = useState('');

  // dialog states
  const [submitAlert, setSubmitAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // form states
  const [id, setId] = useState('');
  const [nama, setNama] = useState('');
  const [harga, setHarga] = useState(0);
  const [stok, setStok] = useState(0);
  const [vendor, setVendor] = useState('');

  const ubahBarang = async () => {
    try {
      await editBarang({
        variables: {
          id,
          input: {
            nama,
            harga: Number(harga),
            stock: Number(stok),
            vendor,
          },
        },
      });

      setTimeout(() => {
        setLoading(false);
        setSubmitAlert(false);
        setSuccess(true);
      }, 2000);
    } catch (e) {
      console.log(e);
    }
  };

  const handleFormClose = () => {
    formClose(false);
  };

  const handleAlertClose = () => {
    setSubmitAlert(false);
    setFalseData(false);
    formClose(true);
  };

  const handleAlertOpen = () => {
    setSubmitAlert(true);
  };

  const handleSubmit = () => {
    formClose(false);
    setLoading(true);

    const numberizedHarga = Number(harga);
    const numberizedStok = Number(stok);

    if (
      !nama.length ||
      !String(harga).length ||
      !String(stok).length ||
      !vendor.length
    ) {
      setAlertTitle('Whoops! Tolong lebih teliti lagi!');
      setAlertContent('Terdapat bagan yang kosong, coba revisi lagi brok!');
      setFalseData(true);
      return;
    } else if (numberizedHarga < 1 || typeof numberizedHarga !== 'number') {
      setAlertTitle('Eitss! Cek hargana deui brok!');
      setAlertContent('Harga tidak boleh di bawah 1 Rupiah!');
      setFalseData(true);
      return;
    } else if (numberizedStok < 1 || typeof numberizedStok !== 'number') {
      setAlertTitle('Eitss! Cek stokna brok!');
      setAlertContent(
        'Stok kudu lebih dari 1 brok, kalo kurang kamu jual apa ?'
      );
      setFalseData(true);
      return;
    }

    ubahBarang();
  };

  const handleSnackbarClose = (_, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSuccess(false);
  };

  useEffect(() => {
    setId(formData[0]);
    setNama(formData[1]);
    setHarga(formData[2]);
    setStok(formData[3]);
    setVendor(formData[4]);
  }, [formData]);

  return (
    <>
      <Dialog
        open={submitAlert}
        onClose={handleAlertClose}
        aria-labelledby="alert">
        <DialogTitle id="alert">
          Apakah anda yakin ingin mengubah data ?
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Aksi ini tidak dapat dikembalikan!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {loading ? (
            <CircularProgress size={25} className={classes.editProgress} />
          ) : (
            <Button onClick={handleAlertClose} style={{ color: 'red' }}>
              Tutup
            </Button>
          )}
          <Button
            disabled={loading ? true : false}
            onClick={handleSubmit}
            color="primary">
            Ubah
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={falseData}
        onClose={handleAlertClose}
        aria-labelledby="alert">
        <DialogTitle id="alert">{alertTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText>{alertContent}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAlertClose} style={{ color: 'red' }}>
            Kembali
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={success}
        autoHideDuration={1500}
        onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity="success">
          Data berhasil diubah!
        </Alert>
      </Snackbar>
      <Dialog open={open} onClose={handleFormClose} aria-labelledby="edit-form">
        <DialogTitle id="edit-form">Edit Data</DialogTitle>
        <DialogContent>
          <TextField
            error={id.length ? false : true}
            margin="dense"
            label="ID"
            value={id}
            fullWidth
            disabled
          />
          <TextField
            error={nama.length ? false : true}
            margin="dense"
            label="Nama Barang"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            fullWidth
          />
          <TextField
            error={String(harga).length ? false : true}
            margin="dense"
            label="Harga"
            type="number"
            value={harga}
            onChange={(e) => setHarga(Number(e.target.value))}
            fullWidth
          />
          <TextField
            error={String(stok).length ? false : true}
            margin="dense"
            label="Stok"
            type="number"
            value={stok}
            onChange={(e) => setStok(Number(e.target.value))}
            fullWidth
          />
          <TextField
            error={vendor.length ? false : true}
            margin="dense"
            label="Nama Toko"
            value={vendor}
            onChange={(e) => setVendor(e.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleFormClose} style={{ color: 'red' }}>
            Batalkan
          </Button>
          <Button onClick={handleAlertOpen} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

import React, { useState } from 'react';

// @material-ui core
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
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
import { BUAT_BARANG } from '../services/schema';

// utils
import { Alert } from '../utils/helper';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  loginProgress: {
    marginRight: theme.spacing(2),
  },
}));

export default () => {
  // barang mutation
  const [buatBarang] = useMutation(BUAT_BARANG);

  // component state
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState('');

  // form state
  const [nama, setNama] = useState('');
  const [harga, setHarga] = useState('');
  const [stok, setStok] = useState('');
  const [vendor, setVendor] = useState('');

  // alert state ( males buat-buat lagi )
  const [alertTitle, setAlertTitle] = useState('');
  const [alertContent, setAlertContent] = useState('');
  const [falseData, setFalseData] = useState(false);

  const newBarang = async () => {
    try {
      await buatBarang({
        variables: {
          input: {
            nama,
            harga: Number(harga),
            stock: Number(stok),
            vendor,
          },
        },
      });

      setSnackbarMsg(`${nama} berhasil ditambahkan brok!`);

      setTimeout(() => {
        setLoading(false);
        setSuccess(true);
        window.location.reload();
      }, 2000);
    } catch (e) {
      setAlertTitle('Barang udah ada!');
      setAlertContent('Barang itu udah ada, coba ganti yang lain brok!');
      setFalseData(true);
    }
  };

  const handleAlertOpen = () => {
    setOpen(true);
    setLoading(true);
  };

  const handleAlertClose = () => {
    setOpen(false);
    setFalseData(false);
    setLoading(false);
  };

  const handleSnackbarClose = (_, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSuccess(false);
  };

  const handleSubmit = () => {
    // close alert
    setOpen(false);

    // new number state
    const numberizedHarga = Number(harga);
    const numberizedStok = Number(stok);

    // perform check
    if (
      !nama.length ||
      !String(harga).length ||
      !String(stok).length ||
      !vendor.length
    ) {
      setAlertTitle('Terjadi Kesalahan!');
      setAlertContent('Terdapat bagan yang kosong, tolong cek kembali!');
      setFalseData(true);
      return;
    } else if (numberizedStok < 1 || typeof numberizedStok !== 'number') {
      setAlertTitle('Cek Stok Anda!');
      setAlertContent('Stok tidak boleh kurang dari 1.');
      setFalseData(true);
      return;
    } else if (numberizedHarga < 1 || typeof numberizedHarga !== 'number') {
      setAlertTitle('Cek Harga Anda!');
      setAlertContent('Harga tidak boleh kurang dari 1 Rupiah.');
      setFalseData(true);
      return;
    }

    newBarang();
  };

  return (
    <>
      <Paper className={classes.paper}>
        <Typography component="h2" variant="h6" gutterBottom>
          Tambah Barang
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Nama"
              margin="dense"
              variant="outlined"
              helperText="Nama barang yang ingin ditambah."
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs>
            <TextField
              label="Harga"
              type="number"
              margin="dense"
              variant="outlined"
              helperText="Harga dan stok untuk barang."
              value={harga}
              onChange={(e) => setHarga(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs>
            <TextField
              label="Stok"
              type="number"
              margin="dense"
              variant="outlined"
              value={stok}
              onChange={(e) => setStok(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Nama Penjual"
              margin="dense"
              variant="outlined"
              helperText="Atas nama penjual untuk barang ini."
              value={vendor}
              onChange={(e) => setVendor(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid container justify="flex-end">
            {loading ? (
              <CircularProgress size={39} className={classes.loginProgress} />
            ) : (
              ''
            )}
            <Button
              disabled={loading ? true : false}
              variant="contained"
              color="primary"
              onClick={handleAlertOpen}>
              Tambahkan
            </Button>
          </Grid>
        </Grid>
      </Paper>
      <Dialog open={open} onClose={handleAlertClose} aria-labelledby="alert">
        <DialogTitle id="alert">
          Apakah anda ingin menambahkan data tersebut?
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Sebelumnya cek terlebih dahulu data pada tabel di bawah, apakah
            barang ini baru atau terdapat tipe yang sama. Data akan masuk ke
            dalam database untuk ditampilkan kepada pembeli.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAlertClose} style={{ color: 'red' }}>
            Batalkan
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Tambahkan
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
          {snackbarMsg}
        </Alert>
      </Snackbar>
    </>
  );
};

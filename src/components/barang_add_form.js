import React, { useState } from 'react';

// @material-ui core
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
}));

export default () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleAlertOpen = () => {
    setOpen(true);
  };

  const handleAlertClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    // TODO: add submit func
    setOpen(false);
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
              helperText="Nama barang yang ingin dimasukkan."
              fullWidth
            />
          </Grid>
          <Grid item xs>
            <TextField
              label="Harga"
              type="number"
              margin="dense"
              variant="outlined"
              helperText="Harga dan stok yang ingin ditambahkan."
              fullWidth
            />
          </Grid>
          <Grid item xs>
            <TextField
              label="Stok"
              type="number"
              margin="dense"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Nama Toko"
              margin="dense"
              variant="outlined"
              helperText="Atas nama toko untuk barang ini."
              fullWidth
            />
          </Grid>
          <Grid container justify="flex-end">
            <Button
              variant="outlined"
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
            Data akan masuk ke dalam database untuk ditampilkan kepada pembeli.
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
    </>
  );
};

import React from 'react';

// @material-ui core
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
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

  return (
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
          <Button variant="outlined" color="primary">
            Tambahkan
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

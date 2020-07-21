import React, { useState, useEffect } from 'react';

// @material-ui core
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

// @material-ui icons
import RoomIcon from '@material-ui/icons/Room';

// helper
import { formatPhoneNumber, formatEmail } from '../utils/helper';

export default ({ open, formClose, formData }) => {
  // dialog states
  const [submitAlert, setSubmitAlert] = useState(false);

  // form states
  const [id, setId] = useState('');
  const [username, setUsername] = useState('');
  const [nama, setNama] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [latlng, setLatlng] = useState('');

  const handleFormClose = () => {
    formClose(false);
  };

  const handleAlertClose = () => {
    setSubmitAlert(false);
  };

  const handleAlertOpen = () => {
    setSubmitAlert(true);
  };

  const handleSubmit = () => {
    formClose(false);
    setSubmitAlert(false);
  };

  useEffect(() => {
    setId(formData[0]);
    setUsername(formData[1]);
    setNama(formData[2]);
    setEmail(formatEmail(formData[3]));
    setPhone(formatPhoneNumber(formData[4]));
    setAddress(formData[6]);
    setLatlng(formData[7]);
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
          <Button onClick={handleAlertClose} style={{ color: 'red' }}>
            Tutup
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Ubah
          </Button>
        </DialogActions>
      </Dialog>
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
            error={username.length ? false : true}
            margin="dense"
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            fullWidth
          />
          <TextField
            error={nama.length ? false : true}
            margin="dense"
            label="Nama User"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            fullWidth
          />
          <TextField
            error={email.length ? false : true}
            margin="dense"
            label="Email User"
            value={email}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">@gmail.com</InputAdornment>
              ),
            }}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
          />
          <TextField
            error={String(phone).length ? false : true}
            margin="dense"
            label="Phone Number"
            type="number"
            value={phone}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">+62</InputAdornment>
              ),
            }}
            onChange={(e) => setPhone(e.target.value)}
            fullWidth
          />
          <TextField
            error={address.length ? false : true}
            margin="dense"
            label="Alamat"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            fullWidth
          />
          <Grid container spacing={3} justify="center" alignItems="center">
            <Grid item xs={10}>
              <TextField
                error={latlng.length ? false : true}
                margin="dense"
                label="Location"
                value={latlng}
                onChange={(e) => setLatlng(e.target.value)}
                helperText="Masukkan koordinat lokasi anda, atau tekan tombol lokasi."
                fullWidth
              />
            </Grid>
            <Grid item xs={2}>
              <IconButton variant="contained" color="primary" aria-label="maps">
                <RoomIcon />
              </IconButton>
            </Grid>
          </Grid>
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


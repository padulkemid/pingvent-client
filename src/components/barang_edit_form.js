import React, { useState, useEffect } from 'react';

// @material-ui core
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default ({ open, formClose, formData }) => {
  // dialog states
  const [submitAlert, setSubmitAlert] = useState(false);

  // form states
  const [id, setId] = useState('');
  const [nama, setNama] = useState('');
  const [harga, setHarga] = useState(0);
  const [stok, setStok] = useState(0);
  const [vendor, setVendor] = useState('');

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

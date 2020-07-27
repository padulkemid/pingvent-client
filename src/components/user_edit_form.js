import React, { useState, useEffect } from 'react';

// @material-ui core
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import InputAdornment from '@material-ui/core/InputAdornment';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

// @material-ui icons
import RoomIcon from '@material-ui/icons/Room';

// @apollo/react-hooks
import { useMutation } from '@apollo/react-hooks';
import { EDIT_USER } from '../services/schema';

// helper
import { formatPhoneNumber, formatEmail } from '../utils/helper';

const getSteps = () => {
  const steps = ['Data Nama', 'Kontak', 'Tempat'];

  return steps;
};

export default ({ open, formClose, formData }) => {
  // stepper state
  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();

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

  // edit states
  const [ubahUser] = useMutation(EDIT_USER);

  // alert states
  const [falseData, setFalseData] = useState(false);
  const [falseTitle, setFalseTitle] = useState('');
  const [falseContent, setFalseContent] = useState('');
  const [loading, setLoading] = useState(false);

  const editDataUser = async () => {
    try {
      const newEmail = `${email}@gmail.com`;
      const newPhone = `+62${phone}`;
      await ubahUser({
        variables: {
          id,
          input: {
            username,
            nama,
            email: newEmail,
            phone: newPhone,
            address,
            latlng,
          },
        },
      });

      setTimeout(() => {
        setLoading(false);
        setSubmitAlert(false);
        formClose(false);
      }, 2000);
    } catch (e) {
      console.log(e);
      setTimeout(() => {
        setLoading(false);
        setSubmitAlert(false);
        setFalseTitle('Sistem ada error!');
        setFalseContent('Sistem mengalami gangguan, coba beberapa saat lagi!');
        setFalseData(true);
      }, 2000);
    }
  };

  const handleFormClose = () => {
    formClose(false);
  };

  const handleAlertClose = () => {
    setSubmitAlert(false);
    setFalseData(false);
  };

  const handleAlertOpen = () => {
    setSubmitAlert(true);
  };

  const handleSubmit = () => {
    setLoading(true);
    setActiveStep(0);

    // add new stuff
    const newPhone = `+62${phone}`;
    const newEmail = `${email}@gmail.com`;

    if (
      !username.length ||
      !nama.length ||
      !email.length ||
      !phone.length ||
      !address.length
    ) {
      setFalseTitle('Bagan masi ada yg kosong!');
      setFalseContent(
        'Brok cek lagi bagan anda masi ada yang kosong, coba liat...'
      );
      setFalseData(true);
      setLoading(false);
      return;
    } else if (!latlng.length) {
      setLatlng('Belum ada koordinat.');
    }

    // validation check
    const phoneRegex = /^((?:\+62|62)|0)[2-9]{1}[0-9]+$/;
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    // email test
    const emailTestBefore = emailRegex.test(email);

    if (!emailTestBefore) {
      const emailTestAfter = emailRegex.test(newEmail);

      if (!emailTestAfter) {
        setFalseTitle('Cek email anda!');
        setFalseContent('Format email anda salah!');
        setFalseData(true);
        setLoading(false);
        return;
      }
    } else {
      setFalseTitle('Cek email anda!');
      setFalseContent('Format email anda salah!');
      setFalseData(true);
      setLoading(false);
      return;
    }

    // phone test
    if (phone.length >= 9 && phone.length <= 12) {
      const testPhone = phoneRegex.test(newPhone);

      if (!testPhone) {
        setFalseTitle('Nomor Handphone !');
        setFalseContent('Format nomer handphone anda salah!');
        setFalseData(true);
        setLoading(false);
        return;
      }
    } else {
      setFalseTitle('Nomor Handphone !');
      setFalseContent('Format nomer handphone anda salah!');
      setFalseData(true);
      setLoading(false);
      return;
    }

    formClose(false);
    editDataUser();
  };

  // stepper funcs

  const handleNext = () => {
    setActiveStep((idx) => idx + 1);
  };

  const handleBack = () => {
    setActiveStep((idx) => idx - 1);
  };

  const getStepContent = (idx) => {
    switch (idx) {
      case 0:
        return (
          <>
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
          </>
        );
      case 1:
        return (
          <>
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
          </>
        );

      case 2:
        return (
          <>
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
                <IconButton
                  variant="contained"
                  color="primary"
                  aria-label="maps">
                  <RoomIcon />
                </IconButton>
              </Grid>
            </Grid>
          </>
        );

      default:
        return '404 Form not found!';
    }
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
          {loading ? (
            <CircularProgress size={19} style={{ marginRight: '1%' }} />
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
        <DialogTitle id="alert">{falseTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText>{falseContent}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAlertClose} style={{ color: 'red' }}>
            Kembali
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={open} onClose={handleFormClose} aria-labelledby="edit-form">
        <DialogTitle id="edit-form">Edit Data</DialogTitle>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((el) => (
            <Step key={el}>
              <StepLabel>{el}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <DialogContent>
          {activeStep === steps.length ? (
            <Typography component="h2" variant="h4" gutterBottom>
              Data sudah diubah!
            </Typography>
          ) : (
            getStepContent(activeStep)
          )}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={activeStep === 0 ? handleFormClose : handleBack}
            style={{ color: 'red' }}>
            {activeStep === 0 ? 'Batalkan' : 'Kembali'}
          </Button>
          <Button
            onClick={
              activeStep === steps.length - 1 ? handleAlertOpen : handleNext
            }
            color="primary">
            {activeStep === steps.length - 1 ? 'Submit' : 'Lanjut'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

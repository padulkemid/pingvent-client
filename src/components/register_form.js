import React, { useState } from 'react';

// @material-ui core
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import InputAdornment from '@material-ui/core/InputAdornment';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
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
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

const getSteps = () => {
  const steps = ['Data Nama', 'Kontak', 'Tempat'];

  return steps;
};

export default ({ open, formClose }) => {
  // stepper state
  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();

  // dialog states
  const [submitAlert, setSubmitAlert] = useState(false);
  const [loading, setLoading] = useState(false);

  // form states
  const [username, setUsername] = useState('');
  const [nama, setNama] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [latlng, setLatlng] = useState('');

  // password validation
  const [samePassword, setSamePassword] = useState('');
  const [showPass, setShowPass] = useState(false);

  // after submit alert
  const [falseData, setFalseData] = useState(false);
  const [falseTitle, setFalseTitle] = useState('');
  const [falseContent, setFalseContent] = useState('');

  const registerUser = async () => {
    try {
      console.log({
        username,
        nama,
        password,
        samePassword,
        role,
        email,
        phone,
        address,
        latlng,
      });
      setTimeout(() => {
        setLoading(false);
        formClose(false);
        setSubmitAlert(false);
        pristineForm();
      }, 2000);
    } catch (e) {
      setFalseTitle('Terjadi kesalahan!');
      setFalseContent('Sistem mengalami gangguan, coba lagi nanti yaw!');
      setFalseData(true);
    }
  };

  const handleFormClose = () => {
    formClose(false);
  };

  const handleShowPass = () => {
    setShowPass(!showPass);
  };

  const handleAlertClose = () => {
    setSubmitAlert(false);
    setFalseData(false);
  };

  const handleAlertOpen = () => {
    setSubmitAlert(true);
  };

  const handleSubmit = () => {
    // back to first step
    setActiveStep(0);
    const newPhone = `+62${phone}`;
    const newEmail = `${email}@gmail.com`;

    // validate
    if (
      !username.length ||
      !nama.length ||
      !password.length ||
      !role.length ||
      !email.length ||
      !phone.length ||
      !address.length
    ) {
      setFalseTitle('Hey cek lagi bagannya!');
      setFalseContent('Ada bagan yang kosong, tolong lihat kembali!');
      setFalseData(true);
      return;
    } else if (password !== samePassword) {
      setFalseTitle('Cek password anda!');
      setFalseContent('Password anda tidak sama!');
      setFalseData(true);
      return;
    } else if (password.length < 8) {
      setFalseTitle('Cek password anda!');
      setFalseContent('Password anda kurang dari 8 karakter!');
      setFalseData(true);
      return;
    } else if (!latlng.length) {
      setLatlng('Belum ada koordinat');
    }

    // regexes
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
        return;
      }

      setEmail(newEmail);
    } else {
      setFalseTitle('Cek email anda!');
      setFalseContent('Format email anda salah!');
      setFalseData(true);
      return;
    }

    // phone test
    if (phone.length >= 9 && phone.length <= 12) {
      const testPhone = phoneRegex.test(newPhone);

      if (!testPhone) {
        setFalseTitle('Nomor Handphone !');
        setFalseContent('Format nomer handphone anda salah!');
        setFalseData(true);
        return;
      }

      setPhone(newPhone);
    } else {
      setFalseTitle('Nomor Handphone !');
      setFalseContent('Format nomer handphone anda salah!');
      setFalseData(true);
      return;
    }

    setLoading(true);
    registerUser();
  };

  const pristineForm = () => {
    setUsername('');
    setNama('');
    setPassword('');
    setSamePassword('');
    setRole('');
    setEmail('');
    setPhone('');
    setAddress('');
    setLatlng('');
    setShowPass(false);
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
              margin="dense"
              variant="outlined"
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              fullWidth
            />
            <TextField
              margin="dense"
              variant="outlined"
              label="Nama User"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              fullWidth
            />
            <Divider style={{ margin: '1% 5%' }} />
            <TextField
              margin="dense"
              variant="outlined"
              label="Password"
              type={showPass ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleShowPass}>
                      {showPass ? <VisibilityIcon /> : <VisibilityOffIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              fullWidth
            />
            <TextField
              margin="dense"
              variant="outlined"
              label="Password Check"
              type={showPass ? 'text' : 'password'}
              value={samePassword}
              onChange={(e) => setSamePassword(e.target.value)}
              helperText="klik lihat password untuk lihat keduanya, password harus lebih dari 8 karakter."
              fullWidth
            />
          </>
        );
      case 1:
        return (
          <>
            <TextField
              margin="dense"
              variant="outlined"
              label="Email User"
              value={email}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">@gmail.com</InputAdornment>
                ),
              }}
              onChange={(e) => setEmail(e.target.value)}
              helperText="Input bagian depan email anda."
              fullWidth
            />
            <TextField
              margin="dense"
              label="Phone Number"
              variant="outlined"
              type="number"
              value={phone}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">+62</InputAdornment>
                ),
              }}
              onChange={(e) => setPhone(e.target.value)}
              helperText="Harus lebih dari 9 karakter atau kurang dari 12 karakter, dan jangan gunakan 0 di depan."
              fullWidth
            />

            {/* bakal diganti nanti */}
            <TextField
              margin="dense"
              label="Role"
              variant="outlined"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              fullWidth
              select
              helperText="Role internal / penjual toko.">
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="seller">Seller</MenuItem>
              <MenuItem value="user">User</MenuItem>
            </TextField>
          </>
        );

      case 2:
        return (
          <>
            <TextField
              margin="dense"
              variant="outlined"
              label="Alamat"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              fullWidth
            />
            <Grid container spacing={3} justify="center" alignItems="center">
              <Grid item xs={10}>
                <TextField
                  margin="dense"
                  label="Location"
                  variant="outlined"
                  value={latlng}
                  onChange={(e) => setLatlng(e.target.value)}
                  helperText="Masukkan koordinat lokasi anda, atau tekan tombol lokasi. (opsional)"
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

  return (
    <>
      <Dialog
        open={submitAlert}
        onClose={handleAlertClose}
        aria-labelledby="alert">
        <DialogTitle id="alert">
          Apakah anda yakin ingin mendaftar ?
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Jika sudah mendaftar, silahkan cek email anda.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {loading ? (
            <CircularProgress size={19} style={{ marginRight: '0.5%' }} />
          ) : (
            <Button onClick={handleAlertClose} style={{ color: 'red' }}>
              Batal
            </Button>
          )}
          <Button
            disabled={loading ? true : false}
            onClick={handleSubmit}
            color="primary">
            Daftar
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
        <DialogTitle id="edit-form">Daftar Baru</DialogTitle>
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

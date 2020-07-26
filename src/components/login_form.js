import React, { useState } from 'react';

import { navigate } from 'gatsby';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { makeStyles } from '@material-ui/core/styles';

import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

import { useMutation } from '@apollo/react-hooks';
import { LOGIN } from '../services/schema';

import RegisterForm from '../components/register_form';

import { Alert } from '../utils/helper';

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 0),
  },
  loginProgress: {
    display: 'block',
    margin: 'auto',
  },
}));

export default () => {
  const classes = useStyles();

  // login states
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [login] = useMutation(LOGIN);

  // register states
  const [formOpen, setFormOpen] = useState(false);

  // forgot pass states
  const [forgotPass, setForgotPass] = useState(false);
  const [forgotError, setForgotError] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');

  const handleShowPass = () => {
    setShowPass(!showPass);
  };

  const loginUser = async () => {
    setLoading(true);
    try {
      const result = await login({
        variables: {
          input: {
            username,
            password,
          },
        },
      });

      const {
        data: { loginUser },
      } = result;

      // get token and set it to localstorage
      localStorage.setItem('token', loginUser);

      // kalo dimasukin ke timeout ga keluar sue
      setSuccess(true);

      // simulate server loading, da cepet pisan ey localhost
      setTimeout(() => {
        setLoading(false);
        pristineForm();
        navigate('/');
      }, 2000);
    } catch (e) {
      // simulate error brok
      setTimeout(() => {
        setError(true);
        setLoading(false);
      }, 2000);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser();
  };

  const handleRegisterForm = () => {
    setFormOpen(true);
  };

  const handleAlertClose = (_, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSuccess(false);
    setError(false);
  };

  const handleForgotAlert = () => {
    setForgotPass(false);
  };

  const handleForgotErrorAlert = () => {
    setForgotError(false);
  };

  const handleForgotSubmit = () => {
    // TODO: add function to these T_T
    setForgotPass(false);

    const newEmail = `${forgotEmail}@gmail.com`;
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const emailTestBefore = emailRegex.test(forgotEmail);
    const emailTestAfter = emailRegex.test(newEmail);

    if (!emailTestBefore) {
      if (!emailTestAfter) {
        setForgotError(true);
        return;
      }

      setForgotEmail(newEmail);
    } else {
      setForgotError(true);
    }
  };

  const pristineForm = () => {
    setUsername('');
    setPassword('');
  };

  return (
    <>
      <form className={classes.form} noValidate>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="username"
          label="Username"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton disabled>
                  <SupervisedUserCircleIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type={showPass ? 'text' : 'password'}
          id="password"
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
        />
        <Button
          disabled={loading ? true : false}
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          className={classes.submit}>
          Masuk
        </Button>
        {loading ? (
          <CircularProgress size={70} className={classes.loginProgress} />
        ) : (
          ''
        )}
      </form>
      <Snackbar
        open={success}
        autoHideDuration={1500}
        onClose={handleAlertClose}>
        <Alert onClose={handleAlertClose} severity="success">
          Selamat datang di Pingpos!
        </Alert>
      </Snackbar>
      <Snackbar open={error} autoHideDuration={1500} onClose={handleAlertClose}>
        <Alert onClose={handleAlertClose} severity="error">
          Username / Password salah!
        </Alert>
      </Snackbar>
      <Grid container spacing={10}>
        <Grid item xs>
          <Button
            color="primary"
            size="small"
            onClick={() => {
              setForgotPass(true);
            }}
            fullWidth>
            Lupa password ?
          </Button>
        </Grid>
        <Grid item xs>
          <Button
            color="primary"
            size="small"
            onClick={handleRegisterForm}
            fullWidth>
            Tidak punya akun ?
          </Button>
        </Grid>
      </Grid>
      <Dialog
        open={forgotPass}
        onClose={handleForgotAlert}
        aria-labelledby="alert">
        <DialogTitle id="alert">Anda lupa password ?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Tulis alamat email anda di bawah ini, kami akan mengirim data reset
            password anda!
          </DialogContentText>
          <TextField
            variant="outlined"
            margin="dense"
            required
            fullWidth
            label="Email Anda"
            type="email"
            value={forgotEmail}
            onChange={(e) => setForgotEmail(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">@gmail.com</InputAdornment>
              ),
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleForgotAlert} style={{ color: 'red' }}>
            Kembali
          </Button>
          <Button onClick={handleForgotSubmit} color="primary">
            Kirim
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={forgotError}
        onClose={handleForgotErrorAlert}
        aria-labelledby="alert">
        <DialogTitle id="alert">Email anda salah!</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Cek format email anda kembali, jangan ada @ dalam input email.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleForgotErrorAlert} style={{ color: 'red' }}>
            Kembali
          </Button>
        </DialogActions>
      </Dialog>
      <RegisterForm open={formOpen} formClose={(bool) => setFormOpen(bool)} />
    </>
  );
};

import React, { useState } from 'react';

import { navigate } from 'gatsby';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import { makeStyles } from '@material-ui/core/styles';

import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

import { useMutation } from '@apollo/react-hooks';
import { LOGIN } from '../services/schema';

import { Alert } from '../utils/helper';

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  loginProgress: {
    display: 'block',
    margin: 'auto',
  },
}));

export default () => {
  const classes = useStyles();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [login] = useMutation(LOGIN);

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

  const handleAlertClose = (_, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSuccess(false);
    setError(false);
  };

  const pristineForm = () => {
    setUsername('');
    setPassword('');
  };

  return (
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
    </form>
  );
};

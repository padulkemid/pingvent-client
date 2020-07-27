import React, { useState, useEffect } from 'react';

// @material-ui core
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { makeStyles } from '@material-ui/core/styles';

// clsx
import clsx from 'clsx';

// gatsby
import { navigate } from 'gatsby';

// @apollo/react-hooks
import { useQuery, useMutation } from '@apollo/react-hooks';
import { LIST_BARANG, REFRESH_TOKEN } from '../services/schema';

// utils
import { dateFormatToday } from '../utils/helper';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    background: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
  dateContext: {
    flex: 1,
  },
  startVersion: {
    background: theme.palette.secondary.main,
    color: '#000',
  },
}));

export default ({ type }) => {
  const classes = useStyles();
  const [refreshToken] = useMutation(REFRESH_TOKEN);

  // falseData states
  const [falseData, setFalseData] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertContent, setAlertContent] = useState('');

  // barang state
  const { data } = useQuery(LIST_BARANG);
  const [jmlBarang, setJmlBarang] = useState(0);

  // handle tikus-tikus kontol
  const handleAlertClose = () => {
    setFalseData(false);
    localStorage.removeItem('token');
    navigate('/login');
  };

  useEffect(() => {
    if (data) {
      const { semuaBarang } = data;
      setJmlBarang(semuaBarang.length);
    }

    // refresh token to get data (if logged in)
    const token = localStorage.getItem('token');

    // get new token every get into pages inside
    const getNewToken = async (tkn) => {
      try {
        const result = await refreshToken({
          variables: {
            input: {
              token: tkn,
            },
          },
        });

        const { refreshToken: newTkn } = result.data;

        localStorage.setItem('token', newTkn);
      } catch (e) {
        setAlertTitle('???');
        setAlertContent(
          'Anda hekel ? gabisa ngakalin gitu bos gua lebih jago, login dulu sana!'
        );
        setFalseData(true);
      }
    };

    getNewToken(token);
  }, [data]);

  return (
    <>
      <Paper
        className={
          type === 'status'
            ? clsx(classes.paper, classes.startVersion)
            : classes.paper
        }>
        <Typography component="h2" variant="h6" gutterBottom>
          {type === 'status' ? 'Status' : 'Stok'}
        </Typography>
        <Typography
          component="h1"
          variant="h4"
          color="inherit"
          gutterBottom
          noWrap>
          {type === 'status' ? 'Verified' : `${jmlBarang} Barang`}
        </Typography>
        <Typography variant="overline" className={classes.dateContext}>
          diubah pada {dateFormatToday().slice(0, 19)}
        </Typography>
      </Paper>
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
    </>
  );
};

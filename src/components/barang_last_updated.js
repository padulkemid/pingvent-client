import React from 'react';

// @material-ui core
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

// clsx
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    background: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
  },
  dateContext: {
    flex: 1,
  },
}));

export default () => {
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <Typography component="h2" variant="h6" gutterBottom>
        Terakhir Diubah
      </Typography>
      <Typography
        component="h1"
        variant="h4"
        color="inherit"
        gutterBottom
        noWrap>
        21 Juli 2020
      </Typography>
      <Typography variant="overline" className={classes.dateContext}>
        Cek barang anda
      </Typography>
    </Paper>
  );
};

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
    background: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
  dateContext: {
    flex: 1,
  },
  startVersion: {
    background: theme.palette.secondary.main,
  },
}));

export default ({ type }) => {
  const classes = useStyles();

  return (
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
        {type === 'status' ? 'Verified' : '2500 Barang'}
      </Typography>
      <Typography variant="overline" className={classes.dateContext}>
        diubah pada 29 Juli 2020
      </Typography>
    </Paper>
  );
};

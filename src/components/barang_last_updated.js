import React from 'react';

// @material-ui core
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

// utils
import { dateFormatToday } from '../utils/helper';

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

  const getLastUpdated = () => {
    const dateNow = dateFormatToday();

    // indexOf + 2 : find until comma, trus tambah 2 index
    // ( spasi sama koma itu sendiri anying)
    const lastUpdated = dateNow.substring(dateNow.indexOf(',') + 2, 19);

    return lastUpdated;
  };

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
        {getLastUpdated()}
      </Typography>
      <Typography variant="overline" className={classes.dateContext}>
        Cek barang anda
      </Typography>
    </Paper>
  );
};

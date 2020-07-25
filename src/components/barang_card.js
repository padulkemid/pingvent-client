import React, { useState, useEffect } from 'react';

// @material-ui core
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

// clsx
import clsx from 'clsx';

// @apollo/react-hooks
import { useQuery } from '@apollo/react-hooks';
import { LIST_BARANG } from '../services/schema';

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

  // barang state
  const { data } = useQuery(LIST_BARANG);
  const [jmlBarang, setJmlBarang] = useState(0);

  useEffect(() => {
    if (data) {
      const { semuaBarang } = data;
      setJmlBarang(semuaBarang.length);
    }
  }, [data]);

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
        {type === 'status' ? 'Verified' : `${jmlBarang} Barang`}
      </Typography>
      <Typography variant="overline" className={classes.dateContext}>
        diubah pada {dateFormatToday().slice(0, 19)}
      </Typography>
    </Paper>
  );
};

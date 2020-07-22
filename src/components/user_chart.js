import React from 'react';

// @material-ui core
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';

// clsx
import clsx from 'clsx';

// recharts
import {
  LineChart,
  XAxis,
  YAxis,
  Line,
  Tooltip,
  Legend,
  Label,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    height: 450,
  },
  user: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
}));

// chart data
const createData = (user, seller, day) => {
  return { user, seller, day };
};

const data = [
  createData(37, 41, 1),
  createData(38, 42, 2),
  createData(39, 43, 3),
  createData(40, 44, 4),
  createData(41, 45, 5),
  createData(42, 46, 6),
  createData(43, 47, 7),
  createData(44, 48, 8),
  createData(45, 49, 9),
  createData(46, 28, 10),
  createData(25, 29, 11),
  createData(26, 30, 12),
  createData(27, 31, 13),
  createData(28, 32, 14),
  createData(29, 33, 15),
  createData(30, 34, 16),
  createData(31, 35, 17),
  createData(32, 36, 18),
  createData(33, 37, 19),
  createData(34, 38, 20),
  createData(35, 39, 21),
  createData(36, 40, 22),
];

export default ({ type }) => {
  const theme = useTheme();
  const classes = useStyles();

  return (
    <Paper
      className={
        type === 'user' ? clsx(classes.paper, classes.user) : classes.paper
      }>
      <Typography component="h1" variant="h5" color="inherit" gutterBottom>
        {type === 'user'
          ? 'Perkembangan Harian User'
          : 'Perkembangan Harian Seller'}
      </Typography>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{
            top: 10,
            right: 20,
            bottom: 50,
            left: 15,
          }}>
          <CartesianGrid strokeDasharray="2 2" />
          <XAxis
            dataKey="day"
            type="number"
            stroke={type === 'user' ? 'white' : 'black'}>
            <Label
              position="bottom"
              fill={type === 'user' ? 'white' : 'black'}
              style={{
                textAnchor: 'middle',
              }}>
              Hari
            </Label>
          </XAxis>
          <Tooltip />
          <Legend verticalAlign="top" align="right" height={40} />
          <YAxis stroke={type === 'user' ? 'white' : 'black'}>
            <Label
              angle={270}
              position="left"
              fill={type === 'user' ? 'white' : 'black'}
              style={{
                textAnchor: 'middle',
              }}>
              {type === 'user' ? 'User' : 'Seller'}
            </Label>
          </YAxis>
          <Line
            dataKey={type === 'user' ? 'user' : 'seller'}
            stroke={
              type === 'user'
                ? theme.palette.secondary.main
                : theme.palette.primary.main
            }
            fill={
              type === 'user'
                ? theme.palette.secondary.light
                : theme.palette.primary.dark
            }
          />
        </LineChart>
      </ResponsiveContainer>
    </Paper>
  );
};


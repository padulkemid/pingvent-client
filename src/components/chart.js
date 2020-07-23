import React from 'react';

// @material-ui core
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';

// recharts
import {
  AreaChart,
  XAxis,
  YAxis,
  Area,
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
}));

// chart data
const createData = (barangMasuk, barangKeluar, day) => {
  return { barangMasuk, barangKeluar, day };
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

export default () => {
  const theme = useTheme();
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <Typography component="h1" variant="h5" color="inherit" gutterBottom>
        Perkembangan Barang Masuk dan Keluar
      </Typography>
      <ResponsiveContainer>
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 20,
            bottom: 50,
            left: 15,
          }}>
          <defs>
            <linearGradient id="barangMasuk" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor={theme.palette.primary.main}
                stopOpacity={0.8}
              />
              <stop
                offset="95%"
                stopColor={theme.palette.primary.light}
                stopOpacity={0}
              />
            </linearGradient>
            <linearGradient id="barangKeluar" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor={theme.palette.secondary.main}
                stopOpacity={0.8}
              />
              <stop
                offset="70%"
                stopColor={theme.palette.secondary.dark}
                stopOpacity={0}
              />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="2 2" />
          <XAxis dataKey="day" type="number" stroke="black">
            <Label
              position="bottom"
              style={{
                textAnchor: 'middle',
              }}>
              Hari
            </Label>
          </XAxis>
          <Tooltip />
          <Legend verticalAlign="top" align="right" height={40} />
          <YAxis stroke="black">
            <Label
              angle={270}
              position="left"
              style={{
                textAnchor: 'middle',
              }}>
              Barang
            </Label>
          </YAxis>
          <Area
            type="monotone"
            dataKey="barangMasuk"
            stroke={theme.palette.primary.main}
            fillOpacity={1}
            fill="url(#barangMasuk)"
          />
          <Area
            type="monotone"
            dataKey="barangKeluar"
            stroke={theme.palette.secondary.dark}
            fillOpacity={1}
            fill="url(#barangKeluar)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </Paper>
  );
};

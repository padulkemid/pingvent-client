import React, { useState } from 'react';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';

import {
  createMuiTheme,
  MuiThemeProvider,
  makeStyles,
} from '@material-ui/core/styles';

import { useStaticQuery, graphql, navigate } from 'gatsby';
import Img from 'gatsby-image';
import SEO from '../components/seo';

const query = graphql`
  query LoginBg {
    file(relativePath: { eq: "login_bg.png" }) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`;

const Copyright = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link
        color="inherit"
        href="https://rubixovt.com/"
        target="_blank"
        style={{
          textDecoration: 'none',
        }}>
        <b style={{ color: 'black' }}>[rubi</b>
        <b style={{ color: '#fd6801' }}>xovt]</b>
      </Link>{' '}
      {new Date().getFullYear()}
      {' | '}
      Built with
      <Link
        color="inherit"
        href="https://www.gatsbyjs.org/"
        target="_blank"
        style={{
          textDecoration: 'none',
        }}>
        <b style={{ color: '#542C84' }}>{' Gatsby'}</b>
      </Link>{' '}
    </Typography>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: 'black',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const newTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#000',
    },
  },
});

export default () => {
  const data = useStaticQuery(query);
  const classes = useStyles();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);

  const handleShowPass = () => {
    setShowPass(!showPass);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/');
  };

  return (
    <MuiThemeProvider theme={newTheme}>
      <SEO title="Login" />
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={false} md={7} className={classes.image}>
          <Img fluid={data.file.childImageSharp.fluid} alt="Login Background" />
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={5}
          component={Paper}
          elevation={6}
          square>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Pingpos Login
            </Typography>
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
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                className={classes.submit}>
                Masuk
              </Button>
              <Box mt={5}>
                <Copyright />
              </Box>
            </form>
          </div>
        </Grid>
      </Grid>
    </MuiThemeProvider>
  );
};

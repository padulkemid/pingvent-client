import React from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import {
  createMuiTheme,
  MuiThemeProvider,
  makeStyles,
} from '@material-ui/core/styles';

import { useStaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';
import SEO from '../components/seo';
import LoginForm from '../components/login_form';

import { ApolloProvider } from '@apollo/react-hooks';
import client from '../services/graphql';

const query = graphql`
  query LoginBgAndLogoImg {
    loginBg: file(relativePath: { eq: "login_bg.png" }) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid
        }
      }
    }
    logoImg: file(relativePath: { eq: "gatsby-icon.png" }) {
      childImageSharp {
        fixed(width: 50) {
          ...GatsbyImageSharpFixed
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

  return (
    <MuiThemeProvider theme={newTheme}>
      <SEO title="Login" />
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={false} md={7} className={classes.image}>
          <Img
            fluid={data.loginBg.childImageSharp.fluid}
            alt="Login Background"
          />
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
            <Img
              fixed={data.logoImg.childImageSharp.fixed}
              alt="Pingpos Logo"
            />
            <Typography component="h1" variant="h5">
              Pingpos Login
            </Typography>
            <ApolloProvider client={client}>
              <LoginForm />
            </ApolloProvider>
          </div>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Lupa Password ?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                Tidak punya akun ? Daftar !
              </Link>
            </Grid>
          </Grid>
          <Box mt={5}>
            <Copyright />
          </Box>
        </Grid>
      </Grid>
    </MuiThemeProvider>
  );
};

/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import Header from './header';
import './layout.css';

import { ApolloProvider } from '@apollo/react-hooks';
import client from '../services/graphql';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#000',
      light: '#2c2c2c',
      dark: '#000',
      contrastText: '#fff',
    },
    secondary: {
      main: '#e5e5e5',
      light: '#fff',
      dark: '#b3b3b3',
      contrastText: '#000',
    },
  },
});

const Layout = ({ children }) => {
  return (
    <StaticQuery
      query={graphql`
        query SiteTitleQuery {
          site {
            siteMetadata {
              title
            }
          }
        }
      `}
      render={(data) => (
        <MuiThemeProvider theme={theme}>
          <div style={{ minHeight: '100vh', backgroundColor: '#FFF' }}>
            <Header siteTitle={data.site.siteMetadata.title} />
            <div
              style={{
                margin: `0 auto`,
                maxWidth: 1280,
                padding: `0px 1.0875rem 1.45rem`,
                paddingTop: 100,
              }}>
              <ApolloProvider client={client}>
                <main>{children}</main>
              </ApolloProvider>
              <footer style={{ paddingTop: 10, textAlign: 'center' }}>
                © {new Date().getFullYear()}, Proudly served by{` `}
                <a
                  href="https://www.rubixovt.com"
                  target="_blank"
                  rel="noopener noreferrer">
                  <b style={{ color: '#000' }}>[rubi</b>
                  <b style={{ color: '#fd6801' }}>xovt]</b>
                </a>
                {` `}| Built with
                {` `}
                <a
                  href="https://www.gatsbyjs.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#542C84' }}>
                  <b>Gatsby</b>
                </a>
                .
              </footer>
            </div>
          </div>
        </MuiThemeProvider>
      )}
    />
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;

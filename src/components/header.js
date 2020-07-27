import PropTypes from 'prop-types';
import React from 'react';

import { Link, navigate, useStaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';

import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';

import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ArchiveIcon from '@material-ui/icons/Archive';
import PeopleIcon from '@material-ui/icons/People';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';

const drawerWidth = 240;

const query = graphql`
  query logoImgAndGithubIcon {
    logoImg: file(relativePath: { eq: "gatsby-icon.png" }) {
      childImageSharp {
        fixed(width: 50) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    ghImg: file(relativePath: { eq: "github-logo.png" }) {
      childImageSharp {
        fixed(width: 28) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    background: theme.palette.primary.main,
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'space-around',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  pingposInfo: {
    margin: theme.spacing(5),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
}));

const Header = ({ siteTitle }) => {
  const data = useStaticQuery(query);
  const classes = useStyles();

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        elevation={0}
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit">
            {siteTitle}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}>
        <div className={classes.drawerHeader}>
          <Typography variant="overline" color="inherit">
            {`${siteTitle} Menu`}
          </Typography>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          <Link to="/">
            <ListItem button>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText>Dashboard</ListItemText>
            </ListItem>
          </Link>
          <Link to="/barang">
            <ListItem button>
              <ListItemIcon>
                <ArchiveIcon />
              </ListItemIcon>
              <ListItemText>Barang</ListItemText>
            </ListItem>
          </Link>
          <Link to="/member">
            <ListItem button>
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText>Member</ListItemText>
            </ListItem>
          </Link>
        </List>
        <Divider />
        <List>
          <ListItem button onClick={handleLogout}>
            <ListItemIcon>
              <PowerSettingsNewIcon style={{ color: 'red' }} />
            </ListItemIcon>
            <ListItemText>Logout</ListItemText>
          </ListItem>
        </List>
        <Divider />
        <List>
          <a
            href="https://github.com/padulkemid/pingpos"
            target="_blank"
            rel="noopener noreferrer">
            <ListItem button>
              <ListItemIcon>
                <Img
                  fixed={data.ghImg.childImageSharp.fixed}
                  alt="Github Logo"
                />
              </ListItemIcon>
              <ListItemText>Source Code</ListItemText>
            </ListItem>
          </a>
        </List>
        <Divider />
        <List className={classes.pingposInfo}>
          <Img fixed={data.logoImg.childImageSharp.fixed} alt="Pingpos Logo" />
          <br />
          <Typography variant="overline" color="inherit">
            Pingpos v1.0
          </Typography>
        </List>
      </Drawer>
    </div>
  );
};

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: ``,
};

export default Header;

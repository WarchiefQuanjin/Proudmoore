import React, { Component } from 'react'
import Inicio from './Routes/Inicio.js';
import Socioeconomico from './Routes/Socioeconomico.js'
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Routes from './Constants/Routes.js';
import { Link, HashRouter as Router, Route, Switch } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';

const drawerWidth = 240;
const primary = '#8BC34A';

const styles = theme => ({
  root: {
      width: '100%',
      height: '100%',
      marginTop: 0,
      zIndex: 1,
      overflow: 'hidden'
  },
  appFrame: {
      position: 'relative',
      display: 'flex',
      width: '100%',
      height: '100%'
  },
  appBar: {
      backgroundColor: primary,
      position: 'absolute',
      marginLeft: drawerWidth,
      [theme.breakpoints.up('md')]: {
          width: `calc(100% - ${drawerWidth}px)`
      }
  },
  navIconHide: {
      [theme.breakpoints.up('md')]: {
          display: 'none'
      }
  },
  drawerHeader: theme.mixins.toolbar,
  drawerPaper: {
      width: 250,
      [theme.breakpoints.up('md')]: {
          width: drawerWidth,
          position: 'relative',
          height: '100%'
      },
      borderRightStyle: 'none',
      backgroundColor: '#FFFFFF'
  },
  content: {
      backgroundColor: '#FFFFFF',
      width: '100%',
      height: '100%',
      marginTop: 66,
      overflowY: 'scroll'/* ,
      [theme.breakpoints.up('sm')]: {
          height: 'calc(100% - 64px)',
          marginTop: 70
      },
      [theme.breakpoints.up('md')]: {
          width: `calc(100% - ${drawerWidth}px)`
      } */
  },
  routes: {
      minHeight: 'calc(100% - 75px)'
  },
  link: {
      textDecoration: 'none',
      color: '#FFFFFF'
  },
  spacer: {
      flex: '1 1 100%'
  },
  footer: {
      padding: 16,
      textAlign: 'center'
  },
  componentsAlignToCenterStyle: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
  },
  bar: {},
  checked: {
      color: '#FFFFFF',
      '& + $bar': {
          backgroundColor: '#FFFFFF',
      },
  }
});

const mql = window.matchMedia(`(min-width: 960px)`);

class App extends Component {
  state = {
    anchor: 'left',
    mql: mql,
    docked: false,
    mobileOpen: false
  }

  componentWillMount() {
    mql.addListener(this.mediaQueryChanged.bind(this));
    this.setState({ mql: mql, docked: mql.matches });
  }

  componentWillUnmount() {
    this.state.mql.removeListener(this.mediaQueryChanged);
  }

  mediaQueryChanged() {
    this.setState({
        mql: mql,
        docked: mql.matches
    });
  }

  handleDrawerToggle = () => this.setState({
    mobileOpen: !this.state.mobileOpen
  });

  render() {
    const { classes } = this.props;
    const { anchor } = this.state;

    const drawer = (
      <div>
        <div>
          <div className={classes.drawerHeader} style={{ display: 'flex', justifyContent: 'center' }} >
            <Typography style={{ overflow: 'visible', margin: 'auto', width: 'auto', display: 'block' }} type='title' noWrap>Casos Emergentes</Typography>
          </div>
          <Divider />
          <List>
            {
              Routes.map((route, index) =>
                route.linkTo &&
                <Link key={index} className={classes.link} to={route.linkTo}>
                  <ListItem onClick={this.handleDrawerToggle}/* button onClick={this.handleDrawerToggle} */>
                    {/* <ListItemIcon>{route.icon()}</ListItemIcon> */}
                    <ListItemText primary={route.iconText} />
                    {/* <ListItemText primary={route.iconText} /> */}
                  </ListItem>
                </Link>
              )
            }
          </List>
        </div>
      </div>
    );

    return (
      <Router>
        <div className={classes.root}>
          <div className={classes.appFrame}>
            <AppBar className={classes.appBar}>
              <Toolbar>
                <IconButton color='default' aria-label='open drawer' onClick={this.handleDrawerToggle} className={classes.navIconHide}>
                  <MenuIcon />
                </IconButton>
                {Routes.map((route, index) => (
                  <Route key={index} path={route.path} exact={route.exact} component={route.title} />
                ))}
                <div className={classes.spacer}></div>
              </Toolbar>
            </AppBar>
            <Hidden mdUp>
              <Drawer type='temporary' open={this.state.mobileOpen} classes={{ paper: classes.drawerPaper }} onClose={this.handleDrawerToggle} ModalProps={{
                keepMounted: true // Better open performance on mobile.
              }}>
                {drawer}
              </Drawer>
            </Hidden>
            <Drawer 
              variant='permanent' 
              classes={{
                paper: classes.drawerPaper,
              }}
              style={this.state.docked === true ? { display: "flex" } : { display: "none" }}
              anchor={anchor} /* open */ /* style={this.state.docked === true ? { display: "flex" } : { display: "none" }} */ /* classes={{ paper: classes.drawerPaper }} */>
              {drawer}
            </Drawer>
            <main className={classes.content}>
              <div className={classes.routes}>
                <Switch>
                  <Route path='/' exact={true} component={Inicio} />
                  <Route path='/socioeconomico' /* exact={true}  */render={(props) => <Socioeconomico {...props}/>} />
                  {/* <Route path='/transition' exact={true} render={() => <Transition ledStripStatus={this.ledStripStatus} switchFunction={this.switchFunction} />} />
                  <Route path='/customimage' exact={true} render={() => <CustomImage ledStripStatus={this.ledStripStatus} switchFunction={this.switchFunction} />} /> */}
                </Switch>
              </div>
            </main>
          </div>
        </div>
      </Router>
    );
  }
}

export default withStyles(styles)(App);
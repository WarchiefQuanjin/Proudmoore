import React, { Component } from 'react'
import Inicio from './Routes/Inicio.js';
import Graficas from './Routes/Graficas.js'
import Socioeconomico from './Routes/Socioeconomico.js'
import Transporte from './Routes/Transporte.js'
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
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import firebase from 'firebase/app';
import 'firebase/auth';
import PowerSettingsNew from '@material-ui/icons/PowerSettingsNew';
import TxtField from './Components/TxtField';
import TextField from '@material-ui/core/TextField';
import Fade from '@material-ui/core/Fade';
import Snackbar from '@material-ui/core/Snackbar';

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
      overflowY: 'scroll'
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
  },
  button: {
      margin: theme.spacing.unit,
  },
  loginComponent: {
      width: '50%',
      margin: '0 auto'
  },
  outer: {
    display: 'table',
    position: 'absolute',
    height: '100%',
    width: '100%'
  },
  middle: {
    display: 'table-cell',
    verticalAlign: 'middle'
  },
  inner: {
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '400px',
    textAlign: 'center'
    /*whatever width you want*/
  },
  loginButton: {
    marginTop: '30px'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    marginTop: '2px',
    marginBottom: '2px',
    width: '70%'
  }
});

const mql = window.matchMedia(`(min-width: 960px)`);

class App extends Component {
  state = {
    anchor: 'left',
    mql: mql,
    docked: false,
    mobileOpen: false,
    user: undefined,
    email: '',
    password: ''
  }

  login = (event) => {
    event.preventDefault();
    /* firebase.auth().signInWithEmailAndPassword('warchiefquanjin94@gmail.com', 'ilovetacos94'); */
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).catch((error) => {
      // Handle Errors here.
      /* var errorCode = error.code;
      var errorMessage = error.message; */
      this.setState({ open: true, message: error.message});
      // ...
    });

    /* this.setState({ open: true, message: 'El caso ha sido modificado'}); */
    /* firebase.auth().signInWithPopup(provider); */
  }

  logout = (event) => {
    event.preventDefault();
    firebase.auth().signOut();
    this.setState({ user: '' })
  }

  handleClose = () => {
    this.setState({ open: false });
  };

  componentWillMount() {
    mql.addListener(this.mediaQueryChanged.bind(this));
    this.setState({ mql: mql, docked: mql.matches });

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ user: user })
      } else {
        this.setState({ user: '' })
      }
    })
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

  handleChange = (field, value) => {
    this.setState({
        [field]: value
    })
  }

  loginEnter = (e) => {
    if (e.key === 'Enter') {
      this.login(e);
    }
  }

  loginComponent = (classes) => {
    return (
      <div className={classes.outer}>
        <div className={classes.middle}>
          <div className={classes.inner}>
            <Typography variant="title" gutterBottom>
              CARITAS GDL
            </Typography>
            <Typography variant="title" gutterBottom>
              ESTUDIOS SOCIOECONOMICOS
            </Typography>
            <TxtField id={"email"} nombre={"Email"} width={70} term={"%"} onChange={this.handleChange} state={this.state}/>
            <br/>
            <TextField
              id={'password'}
              label={'Password'}
              placeholder={'Password'}
              type={'password'}
              className={classes.textField}
              onChange={(event) => this.handleChange('password', event.target.value)}
              onKeyPress={this.loginEnter}
              value={this.state.password} />
            <br/>

            <Button variant="contained" color="primary" aria-label='login' onClick={this.login} className={classes.loginButton}>
              Ingresar
            </Button>
          </div>
        </div>
      </div>
    )
  }

  main = (classes) => {
    const { anchor } = this.state;

    /* if (this.state.user) {
      console.log(this.state.user)
      icon = <Avatar src={this.state.user.photoURL} />
      title = this.state.user.displayName;
      elementRight = <FlatButton label="Sign-Out" onClick={(event) => this.logout(event)} />;
    } */

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
                <IconButton /* variant="contained" color="primary" */ aria-label='logout' onClick={this.logout} className={classes.button}>
                  <PowerSettingsNew/>
                </IconButton>
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
                  <Route path='/transporte' /* exact={true}  */render={(props) => <Transporte {...props}/>} />
                  <Route path='/graficas' /* exact={true}  */render={(props) => <Graficas {...props}/>} />
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

  render() {
    const { classes } = this.props;
    /* const { anchor } = this.state; */
    const vertical = 'top', horizontal = 'center'
    const { open, message } = this.state;

    return (
      <div>
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={open}
          onClose={this.handleClose}
          TransitionComponent={Fade}
          autoHideDuration={3000}
          ContentProps={{
              'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{message}</span>}
        />
        {console.log('user: '+this.state.user)}
        {this.state.user !== undefined ? this.state.user !== '' ? this.main(classes) : this.loginComponent(classes) : <div/>}
      </div>
    )

    /* const drawer = (
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
                  <ListItem onClick={this.handleDrawerToggle}>
                    <ListItemText primary={route.iconText} />
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
                keepMounted: true 
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
              anchor={anchor}>
              {drawer}
            </Drawer>
            <main className={classes.content}>
              <div className={classes.routes}>
                <Switch>
                  <Route path='/' exact={true} component={Inicio} />
                  <Route path='/socioeconomico' render={(props) => <Socioeconomico {...props}/>} />
                  <Route path='/transporte' render={(props) => <Transporte {...props}/>} />
                  <Route path='/graficas' render={(props) => <Graficas {...props}/>} />
                </Switch>
              </div>
            </main>
          </div>
        </div>
      </Router>
    ); */
  }
}

export default withStyles(styles)(App);
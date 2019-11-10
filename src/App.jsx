import React, { Component } from 'react'
import Inicio from './Routes/Inicio.js';
import Graficas from './Routes/Graficas.js'
import Socioeconomico from './Routes/Socioeconomico.js'
import Transporte from './Routes/Transporte.js'
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
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
const drawerColor = '#e28ebb';
const secondaryColor = '#5c70d2';
// const background = 'https://firebasestorage.googleapis.com/v0/b/proudmoore-e544b.appspot.com/o/Background2.jpg?alt=media&token=95e6122e-220c-44f2-bd9a-dd197e532de4';

const styles = theme => ({
  root: {
    width: '100%',
    height: '100%',
    marginTop: 0,
    zIndex: 1,
    display: 'flex'
  },
  appFrame: {
    position: 'absolute',
    overflowY: 'hidden',
    display: 'flex',
    width: '100%',
    height: '100%'
  },
  appBar: {
    backgroundColor: drawerColor,
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
    backgroundColor: drawerColor
  },
  drawer: {
    position: 'relative',
    backgroundColor: drawerColor,
    height: '100%'
  },
  content: {
    backgroundColor: '#FFFFFF',
    marginTop: 66,
    overflowY: 'scroll',
    width: '100%'
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
    color: 'black',
    backgroundColor: 'white'
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
  },
  image: {
    width: '55px',
    height: '50px',
    marginTop: '10px'
  },
  listText: {
    color: 'white'
  },
  linkButton: {
    borderRadius: '7px',
    margin: '0 auto',
    marginBottom: '5px',
    width: '96%',
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
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).catch((error) => {
      this.setState({ open: true, message: error.message });
    });
  }

  logout = (event) => {
    event.preventDefault();
    firebase.auth().signOut();
    this.setState({ user: '', email: '', password: '' })
  }

  handleClose = () => {
    this.setState({ open: false });
  };

  checkToken = (callback) => {
    var message = '';

    firebase.auth().currentUser.getIdToken(true).then((idToken) => {
      if (typeof callback === "function")
        callback();
    }).catch((error) => {
      console.log(error)
      message = error.code === 'auth/user-token-expired' ? 'La sesión ha caducado, vuelva a ingresar' : 'Ha ocurrido un error';

      this.setState({ open: true, message: message });
    })
  }

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
      <div>
        <div className={classes.outer}>
          <div className={classes.middle}>
            <div className={classes.inner}>
              <Typography variant="title" gutterBottom>
                CARITAS GDL
              </Typography>
              <Typography variant="title" gutterBottom>
                ESTUDIOS SOCIOECONOMICOS
              </Typography>
              <img className={classes.image} src={'https://firebasestorage.googleapis.com/v0/b/proudmoore-e544b.appspot.com/o/Logo.png?alt=media&token=fa2effcc-3778-409e-816a-e6dd4452ab2e'} alt="CÁRITAS DE GUADALAJARA" />
              <br />
              <TxtField id={"email"} nombre={"Email"} width={70} term={"%"} onChange={this.handleChange} state={this.state} />
              <br />
              <TextField
                id={'password'}
                label={'Password'}
                placeholder={'Password'}
                type={'password'}
                className={classes.textField}
                onChange={(event) => this.handleChange('password', event.target.value)}
                onKeyPress={this.loginEnter}
                value={this.state.password} />
              <br />

              <Button variant="contained" color="primary" aria-label='login' onClick={this.login} className={classes.loginButton}>
                Ingresar
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  main = (classes) => {
    const { anchor } = this.state;

    const drawer = (
      <div>
        <div>
          <div className={classes.drawerHeader} style={{ display: 'flex', justifyContent: 'center', backgroundColor: secondaryColor }} >
            {<img className={classes.image} src={'https://firebasestorage.googleapis.com/v0/b/proudmoore-e544b.appspot.com/o/Logo.png?alt=media&token=fa2effcc-3778-409e-816a-e6dd4452ab2e'} alt="CÁRITAS DE GUADALAJARA" />}
          </div>

          <List style={{ backgroundColor: drawerColor, color: 'white' }}>
            {
              Routes.map((route, index) =>
                route.linkTo &&
                <Link key={index} className={classes.link} to={route.linkTo}>
                  <ListItem className={classes.linkButton} style={{ backgroundColor: secondaryColor }} onClick={this.handleDrawerToggle}>
                    <ListItemIcon>{route.icon}</ListItemIcon>

                    <ListItemText primary={route.iconText}
                      classes={{
                        primary: classes.listText
                      }}
                    />
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
            <AppBar position="fixed" className={classes.appBar}>
              <Toolbar>
                <IconButton color='default' aria-label='open drawer' onClick={this.handleDrawerToggle} className={classes.navIconHide}>
                  <MenuIcon />
                </IconButton>

                {Routes.map((route, index) => (
                  <Route key={index} path={route.path} exact={route.exact} component={route.title} />
                ))}
                <div className={classes.spacer}></div>
                <IconButton aria-label='logout' onClick={this.logout} className={classes.button}>
                  <PowerSettingsNew />
                </IconButton>
              </Toolbar>
            </AppBar>

            <div className={classes.drawer}>
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
            </div>

            <main className={classes.content}>
              <div className={classes.routes}>
                <Switch>
                  <Route path='/' exact={true} render={(props) => <Inicio {...props} checkToken={this.checkToken} user={this.state.user} />} />
                  <Route path='/socioeconomico' render={(props) => <Socioeconomico {...props} checkToken={this.checkToken} user={this.state.user} />} />
                  <Route path='/transporte' render={(props) => <Transporte {...props} checkToken={this.checkToken} user={this.state.user} />} />
                  <Route path='/graficas' render={(props) => <Graficas {...props} checkToken={this.checkToken} user={this.state.user} />} />
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
          message={message}
        />
        {this.state.user !== undefined ? this.state.user !== '' ? this.main(classes) : this.loginComponent(classes) : <div />}
      </div>
    )
  }
}

export default withStyles(styles)(App);
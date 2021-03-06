import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import Platform from 'react-platform-js';
import Favicon from 'react-favicon';
import { DesktopLayout, MobileLayout } from './components/layouts';
import injectSheet from 'react-jss';

import actions from './redux/actions';

//Imports providers HOC's
import { withFirebase } from './providers/firebase';

// Imports tasks for Hooks
import registerDbTasksHooks from './Helpers/hooks/dbTasks';

// Custom Material-UI Theme
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import appStyles from './styles/appStyle';
import palette from './styles/palette';

// Jss Provider
import JssProvider from 'react-jss/lib/JssProvider';
import { generateClassName } from './Helpers/classNameJssProvider';

const hubTheme = createMuiTheme({
  palette: {
    primary: { main: palette.primary },
    secondary: { main: palette.secondary }
  },
  typography: { useNextVariants: true }
});

class App extends Component {
  state = {};
  // add Firebase as global var in component
  firebase = this.props.firebase;

  async componentWillMount() {
    await this.tick();
    await this.detectProposalUrl();
    await this.registerHooks();
    console.log(`hub::v${process.env.REACT_APP_VERSION}`);
  }

  async componentDidMount() {
    let timer = setInterval(() => this.tick(), 35000);
    this.setState({ timer });
    this.firebase.auth.onAuthStateChanged(async user => {
      this.props.setCurrentUser(user);
    });

    this.props.platformGet({
      os: Platform.OS || '',
      osVersion: Platform.OSVersion || '',
      browser: Platform.Browser || '',
      browserVersion: Platform.BrowserVersion || '',
      engine: Platform.Engine || '',
      cpu: Platform.CPU || '',
      deviceType: Platform.DeviceType || 'desktop',
      deviceModel: Platform.DeviceModel || '',
      deviceVendor: Platform.DeviceVendor || '',
      ua: Platform.UA || ''
    });
  }

  async tick() {
    const mnRegistered = await this.firebase.getMasternodesTotalCount();
    const userRegistered = await this.firebase.getDBnUsers();
    this.props.getMartkistGovernanceInfo();
    return await this.props.getMartkistInfo(mnRegistered, userRegistered);
  }
  registerHooks() {
    registerDbTasksHooks({ provider: this.firebase });
  }

  async detectProposalUrl() {
    const location = window.location;
    const urlPath = location.pathname;
    const urlId = '/p/';
    if (urlPath.includes(urlId)) {
      const propHash = urlPath.substring(urlId.length);
      await this.props.setProposalContainer('proposalDetail');
      await this.props.setPage('dashBoard');
      await this.props.setProposalShow(propHash);
    } else {
      this.props.setLoading(false);
    }
  }

  render() {
    const { classes } = this.props;

    return (
      <MuiThemeProvider theme={hubTheme}>
        <JssProvider generateClassName={generateClassName}>
          <div className={classes.root}>
            <Favicon url={require('./assets/img/png_favicon.png')} />
            <Platform rules={{ DeviceType: undefined }}>
              <DesktopLayout />
            </Platform>
            <Platform rules={{ DeviceType: 'mobile' }}>
              <MobileLayout />
            </Platform>
          </div>
        </JssProvider>
      </MuiThemeProvider>
    );
  }
}

const stateToProps = state => {
  return {
    app: state.app
  };
};

const dispatchToProps = dispatch => {
  return {
    setCurrentUser: user => dispatch(actions.setCurrentUser(user)),
    getMartkistInfo: (mnRegistered, userRegistered) => {
      return (
        dispatch(actions.getMartkistPrice()),
        dispatch(actions.getMartkistMnCount()),
        dispatch(actions.getMartkistMnRegistered(mnRegistered)),
        dispatch(actions.getMartkistUserRegistered(userRegistered))
      );
    },
    setPage: page => dispatch(actions.setPage(page)),
    platformGet: platformInfo => dispatch(actions.platformGet(platformInfo)),
    set2FA: auth => dispatch(actions.set2FA(auth)),
    setProposalContainer: container =>
      dispatch(actions.setProposalContainer(container)),
    setProposalShow: propHash => dispatch(actions.setProposalShow(propHash)),
    setLoading: value => dispatch(actions.loading(value)),
    getMartkistGovernanceInfo: () => dispatch(actions.getMartkistGovernanceInfo())
  };
};

export default compose(
  withFirebase,
  connect(
    stateToProps,
    dispatchToProps
  ),
  injectSheet(appStyles)
)(App);

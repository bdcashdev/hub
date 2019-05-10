import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';

//Import providers HOC's
import { withFirebase } from '../../../providers/firebase';

import Paper from '@material-ui/core/Paper';
import injectSheet from 'react-jss';
import swal from 'sweetalert';

import actions from '../../../redux/actions';
import { doUpdateProfile } from '../../../API/firebase/firebase';

import UserProfile from '../../functionals/userProfile/userProfile';
import UserChangePsw from '../../functionals/userChangePsw/userChangePsw';
import UserDelete from '../../functionals/userDelete/userDelete';
import UserTwoFactor from '../../functionals/userTwoFactor/userTwoFactor';

// Import styles
import userAccountStyle from './userAccount.style';

class UserAccount extends Component {
  constructor(props) {
    super(props);

    this.updateProfile = this.updateProfile.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
    this.deleteProfile = this.deleteProfile.bind(this);
  }

  updateProfile(user) {
    const { firebase } = this.props;
    const [err, updatedUser] = firebase.doUpdateProfile(user);
    /* doUpdateProfile(user)
      .then(data => {
        swal({
          title: 'Success',
          text: 'Account updated.',
          icon: 'success'
        });
        console.log('ACZ data -->', data);
        this.props.setCurrentUser(data);
      })
      .catch(err => {
        swal({ title: 'Oops...KK', text: `${err}`, icon: 'error' });
      }); */
  }

  updatePassword(user) {
    const { firebase } = this.props;
    firebase.doPasswordUpdate(user, (err, data) => {
      if (!err) {
        swal({ title: 'Success', text: 'Account Updated', icon: 'success' });
        this.props.doAppLogout();
        this.props.setPage('login');
      } else {
        swal({ title: 'Oops...', text: `${err}`, icon: 'error' });
      }
    });
  }

  async deleteProfile() {
    const { firebase } = this.props;
    const deleted = await firebase.doDeleteAccount();
    if (deleted) {
      this.props.doAppLogout();
      this.props.setPage('home');
    }
  }

  render() {
    const { classes, deviceType } = this.props;
    const style = deviceType === 'mobile' ? classes.mRoot : classes.root;
    return (
      <div className={style}>
        <h1 className="title">ACCOUNTS SETTINGS</h1>
        <Paper className="paper-container" elevation={4}>
          <UserProfile
            deviceType={this.props.deviceType}
            onUpdateProfile={this.updateProfile}
          />
          <UserChangePsw
            deviceType={this.props.deviceType}
            onUpdatePassword={this.updatePassword}
          />
          <UserTwoFactor deviceType={this.props.deviceType} />
          <UserDelete
            deviceType={this.props.deviceType}
            onDeleteProfile={this.deleteProfile}
          />
        </Paper>
      </div>
    );
  }
}

const stateToProps = state => {
  return {};
};

const dispatchToProps = dispatch => {
  return {
    doAppLogout: () => dispatch(actions.doLogout()),
    setCurrentUser: user => dispatch(actions.setCurrentUser(user)),
    setPage: page => dispatch(actions.setPage(page))
  };
};

export default compose(
  withFirebase,
  connect(
    stateToProps,
    dispatchToProps
  ),
  injectSheet(userAccountStyle)
)(UserAccount);

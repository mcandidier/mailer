
import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { getUserProfile } from './redux/auth/actions';


import {
  SignIn,
  Inbox,
  Nav,
} from './components';

import './App.css';


function App(props) {
  // const user = useSelector(state => state.user.user);
  const {user} = props;

  console.log(user, 'user');

  return (
    <div className="App">
      <Nav></Nav>
      <SignIn></SignIn>
      {user.loggedIn}
    </div>
  );
}

const mapStateToProps = state => {
  const {user} = state;
  return {
    user
  }
}

const mapDispatchToProps = dispatch => {
  dispatch(getUserProfile());
  return {}
}


export default connect(mapStateToProps, mapDispatchToProps)(App);


import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { 
  Switch,
  Route,
  BrowserRouter as Router,
  Link }  from 'react-router-dom';

import { getUserProfile } from './redux/auth/actions';


import {
  SignIn,
  Inbox,
  Nav,
  Register,
  ForgotPassword,
  ResetPassword,
  Message,
} from './components';

import './App.css';


function App(props) {
  const {user, getUserProfile} = props;
  const {loggedIn} = user;

  useEffect(() => {
    if(loggedIn) {
      getUserProfile();
    }
  },[]);

  return (
    <div className="App">
      {/* {loggedIn && <Nav />} */}
      <Router>
        <Switch>
          <Route exact path='/'>
            {loggedIn ? <Inbox/> : <SignIn/> }
          </Route>
          <Route exact path='/register/' component={Register}></Route>
          <Route exact path='/forgot-password/' component={ForgotPassword}></Route>
          <Route exact path='/reset-password/' component={ResetPassword}></Route>
          <Route exact path='/message/:id/' component={Message}></Route>

        </Switch>
      </Router>
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
  return {
    getUserProfile: () => dispatch(getUserProfile()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
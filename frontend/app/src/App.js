
import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';

import { getUserProfile } from './redux/auth/actions';


import {
  SignIn,
  Inbox,
  Nav,
} from './components';

import './App.css';


function App(props) {
  const {user} = props;
  const {loggedIn} = user;
  return (
    <div className="App">
      {loggedIn && <Nav />}

      <Router>
        <Switch>
          <Route exact path='/'>
            {loggedIn ? <Inbox/> : <SignIn/> }
          </Route>
          {/* <Route exact path='/login/' component={SignIn}></Route> */}
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
  dispatch(getUserProfile());
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
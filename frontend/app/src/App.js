
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { 
  Switch,
  Route,
  BrowserRouter as Router,
  Link }  from 'react-router-dom';

import {
  SignIn,
  Main,
  Register,
  ForgotPassword,
  ResetPassword,
  Message,
  Trash,
  MessageList
} from './components';

import { getUserProfile } from './redux/auth/actions';
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
      {/* TODO: add config for protected routes */}
      <Router>
        <Switch>
          <Route exact path='/'>
            {loggedIn ? <Main  component={MessageList}/> : <SignIn/> }
          </Route>

          <Route exact path='/draft'>
          {loggedIn ? <Main  component={MessageList}/> : <SignIn/> }
          </Route>
          <Route exact path='/sent'>
          {loggedIn ? <Main  component={MessageList}/> : <SignIn/> }
          </Route>
          <Route exact path='/trash'>
            <Main component={Trash}></Main>
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

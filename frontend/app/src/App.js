
import { useSelector } from 'react-redux';
import {
  SignIn,
  Inbox,
  Nav,
} from './components';

import './App.css';


function App() {
  const user = useSelector(state => state.user.user);
  console.log(user, 'user');
  return (
    <div className="App">
      <Nav></Nav>
      <SignIn></SignIn>
      {user.loggedIn}
    </div>
  );
}

export default App;

import './App.css';
import { BrowserRouter, Route, Switch} from 'react-router-dom';

import Home from './Components/Home';
import Profile from './Components/Profile';
import Chat from './Components/Chat';
import Signup from './Components/Signup';
import UserRegistration from './Components/UserRegistration';

function App() {
  return (
      <BrowserRouter>
        <Switch>
          <Route path="/profile" component ={Profile}/>
          <Route path="/chat"    component ={Chat}/>
          <Route path="/signup" component ={Signup}/>
          <Route path="/register" component ={UserRegistration}/>
          <Route path="/" exact  component ={Home}/>
        </Switch>
      </BrowserRouter>
  );
}

export default App;

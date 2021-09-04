import './App.css';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import AuthProvider from './Context/AuthContext'

import Home from './Components/Home';
import Profile from './Components/Profile';
import Chat from './Components/Chat';
import Signup from './Components/Signup';
import Addskills from './Components/Addskills'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Switch>
          <Route path="/profile" component ={Profile}/>
          <Route path="/chat"    component ={Chat}/>
          <Route path="/signup" component ={Signup}/>
          <Route path="/addskills" component ={Addskills}/>
          <Route path="/" exact  component ={Home}/>
        </Switch>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

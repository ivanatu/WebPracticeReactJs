import React, { Component } from 'react';
import './App.css';
import './static/styles.css'
import Login from './components/login'
import Notifications from 'react-notify-toast'
import { Route, Switch} from 'react-router-dom'
import axios from 'axios'

axios.defaults.baseURL-`http://api.mathjs.org/`
class App extends Component {

  render() {
    return (
      <div>
      <Notifications options={{zIndex: 5000}}/>
          <Switch>
          <Route exact path="/" component={Login}/>
          </Switch>
      </div>
    );
  }

}

export default App;


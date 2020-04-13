import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import NavBar from './Components/NavBar';
import LoginContainer from './Containers/LoginContainer';
import Dashboard from './Containers/Dashboard'
import MakeRequest from './Containers/MakeRequest'
import {API_BASE} from './constants';

class App extends React.Component {
state = {
  projectsList: []
}

componentDidMount(){
  fetch(`${API_BASE}/projects`)
  .then(res => res.json())
  .then(data => {
    this.setState({
      projectsList: data
    })
  })
}
  render () {
    return (
    <div className="App">
      <NavBar />
      {/* <Switch>
          <Route path="/login" component={LoginContainer} />
          <Route path="/make_request" component={MakeRequest}/>
          <Route path="/dashboard" component={Dashboard} />
        </Switch> */}
    </div>
  )
  }

}

export default App;

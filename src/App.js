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
    projectsList: [],
    login: {    
      username: '',
      password: ''
    }, 
    signup: {
    }, 
    validated: {
      // username: '', 
      // department: '', 
      // usertype: '', 
      // department_id: '', 
      // user_id: ''
    }
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

  handleLoginOnChange = e => {
    this.setState({
      login: {...this.state.login, [e.target.name]: e.target.value}
    })
  }

  handleSignin = (e) => {
    e.preventDefault()

    fetch('http://127.0.0.1:3001/api/v1/users')
    .then(response => response.json())
    .then(data => this.setState({
      validated: { ...data.find(user => ((user.username === this.state.login.username) && (user.password === this.state.login.password)))}
    }))
  }

  render () {
    console.log(this.state)
    const stateProps = {...this.state}

    return (
    <div className="App">
      <NavBar />
      <Switch>
          <Route path="/login" render={routerProps => <LoginContainer {...routerProps} stateProps={stateProps} handleLoginOnChange={this.handleLoginOnChange} handleSignin={this.handleSignin}/>} />
          <Route path="/make_request" component={MakeRequest}/>
          <Route path="/dashboard" component={Dashboard} />
        </Switch>
    </div>
  )
  }

}

export default App;

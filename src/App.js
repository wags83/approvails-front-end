import React from 'react';
import './App.css';
import { Route, Switch} from 'react-router-dom';
import NavBar from './Components/NavBar';
import LoginContainer from './Containers/LoginContainer';
import Dashboard from './Containers/Dashboard'
import MakeRequest from './Containers/MakeRequest'
import ProjectDetails from './Components/ProjectDetails'
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
    validatedUser: {
      username: 'user1', 
      department: 'Sales & Trading', 
      usertype: 'submitter', 
      department_id: 1, 
      user_id: 1
    },
    searchTerm: ""
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

handleSearchChange = (event) => {
  this.setState({searchTerm: event.target.value})
}

filterProjectsByUserTypeAndSearchTerm = () => {
  let filteredProjects = this.state.projectsList
  if (this.state.validatedUser.usertype === 'approver') {
    filteredProjects = this.state.projectsList.filter(project => project.department.id === this.state.validatedUser.department_id)
  }
  else if (this.state.validatedUser.usertype === 'submitter') {
    filteredProjects = this.state.projectsList.filter(project => project.user_id === this.state.validatedUser.user_id)
  }
  let displayProjects = filteredProjects.filter(project => project.project_name.toLowerCase().includes(this.state.searchTerm.toLowerCase()))
  return displayProjects
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
    const stateProps = {...this.state}

    return (
    <div className="App">
      <NavBar />
        <Switch>
          <Route path="/login" render={routerProps => <LoginContainer {...routerProps} stateProps={stateProps} handleLoginOnChange={this.handleLoginOnChange} handleSignin={this.handleSignin}/>} />
          <Route path="/make_request" component={MakeRequest}/>
          <Route path="/dashboard" render={routerProps => 
          <Dashboard {...routerProps} 
          projects={this.filterProjectsByUserTypeAndSearchTerm()} 
          handleSearchChange={this.handleSearchChange} 
          searchTerm={this.state.searchTerm}
          validatedUser={this.state.validatedUser} />}
          />
          <Route path="/api/v1/projects/:id" render={routerProps => 
          <ProjectDetails {...routerProps}
          validatedUser={this.state.validatedUser} />}
          />
        </Switch>
    </div>
  )
  }

}

export default App;

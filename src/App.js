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
// TO DO:
// -Get user's name, type and department here so it can be passed down to other components
// -Filter project list by department for approvers, by associated project for submitters, PM view should be good as is

  state = {
  projectsList: [],
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

handleSearchChange = (event) => {
  this.setState({searchTerm: event.target.value})
}

filterProjectsBySearchTerm = () => {
  let displayProjects = this.state.projectsList.filter(project => project.project_name.includes(this.state.searchTerm))
  return displayProjects
}

  render () {
    return (
    <div className="App">
      <NavBar />
      <Switch>
          <Route path="/login" component={LoginContainer} />
          <Route path="/make_request" component={MakeRequest}/>
          <Route path="/dashboard" render={routerProps => 
          <Dashboard {...routerProps} 
          projects={this.filterProjectsBySearchTerm()} 
          handleSearchChange={this.handleSearchChange} 
          searchTerm={this.state.searchTerm} />}
          />
          <Route path="/api/v1/projects/:id" component={ProjectDetails} />
      </Switch>
    </div>
  )
  }

}

export default App;

import React from 'react';
import './App.css';
import { Route, Switch} from 'react-router-dom';
import NavBar from './Components/NavBar';
import LoginContainer from './Containers/LoginContainer';
import Dashboard from './Containers/Dashboard'
import MakeRequest from './Containers/MakeRequest'
import ProjectDetails from './Components/ProjectDetails'
import { API_BASE } from './constants';

class App extends React.Component {
  state = {
    projectsList: [],
    login: {    
      username: '',
      password: ''
    }, 
    searchTerm: "",
      validated: {
        // user_type: 'project manager',
        // department_id: 1
      }, 
      signup: {
        username: '', 
        password: '', 
        name: '', 
        user_type: '', 
        email: '', 
        department_id: ''
      }
    }

    componentDidMount(){
      this.getProjects()
    }

    getProjects = () => {
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

  handleLoginOnChange = e => {
    this.setState({
      login: {...this.state.login, [e.target.name]: e.target.value}
    })
  }
    handleSignupOnChange = e => {
      this.setState({
        signup: { ...this.state.signup, [e.target.name]: e.target.value }
      })
    }

  updateProjectListOnEdit = (data) => {
      // let index = this.state.projectsList.findIndex(project => project.id === data.id)
      // this.setState({projectsList[index]: data})
      this.getProjects()
    }

  filterProjectsByUserTypeAndSearchTerm = () => {
    let filteredProjects = this.state.projectsList
    if (this.state.validated.user_type === 'approver') {
      filteredProjects = this.state.projectsList.filter(project => project.department.id === this.state.validated.department_id)
    }
    else if (this.state.validated.user_type === 'submitter') {
      filteredProjects = this.state.projectsList.filter(project => parseInt(project.user_id) === parseInt(this.state.validated.id))
    }
    let displayProjects = filteredProjects.filter(project => project.project_name.toLowerCase().includes(this.state.searchTerm.toLowerCase()))
    return displayProjects
  }
  handleSearchChange = (event) => {
    this.setState({searchTerm: event.target.value})
  }
    
  handleSignin = (e, history) => {
    e.preventDefault()

    fetch('http://127.0.0.1:3001/api/v1/users')
    .then(response => response.json())
    .then(data => this.setState({
      validated: { ...data.find(user => ((user.username === this.state.login.username) && (user.password === this.state.login.password)))}
    }))
    .then(() => {
      switch (this.state.validated.user_type) {
        case 'submitter':
          history.push('/make_request')
          break
        default:
          history.push('/dashboard')
      }
    })
  }

  handleCreateNewUser = e => {
    e.preventDefault()

    const obj = {
      method: 'POST', 
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }, 
      body: JSON.stringify(this.state.signup)
    }

    fetch(`${API_BASE}/users`, obj)
    .then(response => response.json())
    .then(data => {
      console.log('Success', data)
      this.setState({ validated: { data } })
    }, () => console.log(this.state.validated))
    .catch(error => console.log('Error', error))
  }

  render () {
    // console.log(this.state)
    const stateProps = {...this.state}

    return (
    <div className="App">
      <NavBar />
        <Switch>
          <Route path="/login" render={routerProps => <LoginContainer {...routerProps} 
            stateProps={stateProps}
            handleLoginOnChange={this.handleLoginOnChange} 
            handleSignin={this.handleSignin} 
            handleSignupOnChange={this.handleSignupOnChange}
            handleCreateNewUser={this.handleCreateNewUser}/>} 
            />
          <Route path="/make_request" render={routerProps => <MakeRequest  {...routerProps} validatedUser={this.state.validated} />}/>
          <Route path="/dashboard" render={routerProps => 
          <Dashboard {...routerProps} 
          projects={this.filterProjectsByUserTypeAndSearchTerm()} 
          handleSearchChange={this.handleSearchChange} 
          searchTerm={this.state.searchTerm}
          validatedUser={this.state.validated} />}
          />
          <Route path="/api/v1/projects/:id" render={routerProps => 
          <ProjectDetails {...routerProps}
          validatedUser={this.state.validated}
          updateProjectListOnEdit={this.updateProjectListOnEdit} />}
          />
        </Switch>
    </div>
  )
  }

}

export default App;

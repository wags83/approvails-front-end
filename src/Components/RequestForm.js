import React from 'react';
import {API_BASE} from '../constants';

class RequestForm extends React.Component {
// TO DO: 
// -Create submit function
// -Bring down props for username and department, make fields non-editable
// -Drop downs for locations
        
    state = {
        project_name: "",
        description: "",
        budget: "",
        submitted_date: "",
        required_completion_date: "",
        username: "",
        department: "",
        approved_date: "",
        approved_by: "",
        locations: []
    }
    
    componentDidMount() {
        this.getLocations()
    }
    getLocations = () => {
        fetch(`${API_BASE}/locations`)
        .then(resp => resp.json())
        .then(locations => this.setState({ locations }))
    }

    handleNewMakeRequestChange = (event) => {
        this.setState({[event.target.name]: event.target.value})
    }

    render () {
    return (
        <div>This is a Project Request Form 
        <form >
        <label>
          Project Name: 
          <input 
          type="text" 
          name='project_name' 
          value={this.state.project_name} 
          onChange={this.handleMakeRequestChange} />
        </label>
        <label>
          Description: 
          <input 
          type="text" 
          name='description' 
          value={this.state.description} 
          onChange={this.handleMakeRequestChange} />
        </label>        <label>
          Username: 
          <input 
          type="text" 
          name='username' 
          value={this.state.username} 
          onChange={this.handleMakeRequestChange} />
        </label>        <label>
          Department: 
          <input 
          type="text" 
          name='department' 
          value={this.state.department} 
          onChange={this.handleMakeRequestChange} />
        </label>        <label>
          Submitted Date: 
          <input 
          type="text" 
          name='submitted_date' 
          value={this.state.submitted_date} 
          onChange={this.handleMakeRequestChange} />
        </label>        <label>
          Required Completion Date: 
          <input 
          type="text" 
          name='required_completion_date' 
          value={this.state.required_completion_date} 
          onChange={this.handleMakeRequestChange} />
        </label> 
        <input type="submit" value="Submit" />
      </form>
        </div>
    )
    }

}

export default RequestForm;
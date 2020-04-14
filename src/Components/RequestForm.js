import React from 'react';
import {API_BASE} from '../constants';

class RequestForm extends React.Component {
// TO DO: 
// -Create submit function
// -Bring down props for username and department

        
    state = {
        project_name: "",
        description: "",
        budget: undefined,
        submitted_date: "",
        required_completion_date: "",
        username: "",
        user_id: undefined,
        department: "",
        department_id: undefined,
        approved_date: "",
        approved_by: "",
        locations: [],
        selectedLocation: ""
    }
    
    componentDidMount() {
        this.getLocations()
        this.getCurrentDate()
    }

    getCurrentDate = () => {
        const current_date = new Date()
        let month = '' + (current_date.getMonth() + 1)
        let day = '' + current_date.getDate()
        let year = current_date.getFullYear()

        if (month.length < 2) {
            month = '0' + month
        }
        if (day.length < 2) {
            day = '0' + day
        }

        const full_date = [year, month, day].join('-');
        this.setState({submitted_date: full_date})
    }

    getLocations = () => {
        fetch(`${API_BASE}/locations`)
        .then(resp => resp.json())
        .then(locations => this.setState({ locations }))
    }

    handleMakeRequestChange = (event) => {
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
        </label><br></br>
        <label>
          Description: 
          <input 
          type="text" 
          name='description' 
          value={this.state.description} 
          onChange={this.handleMakeRequestChange} />
        </label><br></br> 
        <label>
          Budget: 
          <input 
          type="number"
          step="0.01"
          name='budget' 
          value={this.state.budget} 
          onChange={this.handleMakeRequestChange}/>
        </label><br></br>  
        <label>Location: 
        <select 
            value={this.state.selectedLocation}
            onChange={(e) => this.setState({selectedLocation: e.target.value})}>
            {this.state.locations.map((location) => <option key={location.id} value={location.address}>{location.address}</option>)}
        </select> 
        </label><br></br>           
        <label>
          Required Completion Date: 
          <input 
          type="date" 
          name='required_completion_date' 
          value={this.state.required_completion_date} 
          onChange={this.handleMakeRequestChange} />
        </label><br></br><br></br>
        <label>
          Username: 
          <input 
          type="text" 
          name='username' 
          value={this.state.username} 
          readOnly />
        </label><br></br>        
        <label>
          Department: 
          <input 
          type="text" 
          name='department' 
          value={this.state.department} 
          readOnly/>
        </label><br></br> 
        <label>
          Submitted Date: 
          <input 
          type="text" 
          name='submitted_date' 
          value={this.state.submitted_date} 
          readOnly />
        </label><br></br> 
        <input type="submit" value="Submit Request" />
      </form>
        </div>
    )
    }

}

export default RequestForm;
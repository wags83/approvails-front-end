import React from 'react';
import { API_BASE } from '../constants'
import '../assets/styles.scss'

class EditProjectForm extends React.Component {
     state = {  
        updatedName: this.props.project.project_name,
        updatedBudget: this.props.project.budget,
        updatedLocation: '',
        updatedDescription: this.props.project.description,
        updatedRequiredCompletionDate: this.props.required_completion_date,
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

    handleEditProjectChange = (event) => {
        this.setState({[event.target.name]: event.target.value})
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
        return full_date
    }

    editProject = (event) => {
        event.preventDefault()
        const configObject = {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                'accept': 'application/json'
            },
            body: JSON.stringify ({ 
                project_name: this.state.updatedProjectName,
                description: this.state.updatedDescription,
                budget: this.state.updatedBudget,
                required_completion_date: this.state.updatedRequiredCompletionDate,
                submitted_date: this.getCurrentDate(),
                location_id: this.state.updatedLocation

        })
        }
        let id = this.props.project.id
        fetch(API_BASE + `/projects/${id}`, configObject)
        .then(res => res.json())
        // .then(result => console.log(result))
        .then(data => {
            this.props.updateStateOnEdit(data)
          })
    }

render () {
return (
    <div className="left-container" >
        <div className="content">
            <div className="form">
                <div className="form-group">
            <form >
            <label>
            Project Name: 
            <input 
            type="text" 
            name='updatedName' 
            value={this.state.updatedName} 
            onChange={this.handleEditProjectChange} />
            </label><br></br>
            <label>
            Description: 
            <input 
            type="text" 
            name='updatedDescription' 
            value={this.state.updatedDescription} 
            onChange={this.handleEditProjectChange} />
            </label><br></br> 
            <label>
            Budget: 
            <input 
            type="number"
            step="0.01"
            name='updatedBudget' 
            value={this.state.updatedBudget} 
            onChange={this.handleEditProjectChange}/>
            </label><br></br>  
            <label>Location: 
            <select 
                value={this.state.updatedLocation}
                onChange={(e) => this.setState({updatedLocation: e.target.value})}>
                {this.state.locations.map((location) => <option key={location.id} value={location.id}>{location.address}</option>)}
            </select> 
            </label><br></br>           
            <label>
            Required Completion Date: 
            <input 
            type="date" 
            name='updatedRequiredCompletionDate' 
            value={this.state.updatedRequiredCompletionDate} 
            onChange={this.handleEditProjectChange} />
            </label><br></br>
            <button className='btn' onClick={(event) => this.editProject(event)}>Submit Request</button> 
        </form>
    </div>
    </div>
    </div>
    </div>
)
}

}

export default EditProjectForm


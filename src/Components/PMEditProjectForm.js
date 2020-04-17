import React from 'react';
import { API_BASE } from '../constants'

class PMEditProjectForm extends React.Component {
     state = {  
        updatedCompletionDate: this.props.project.completed_date,
        updatedStatus: 'in progress'
     }

    handlePMEditProjectChange = (event) => {
        this.setState({[event.target.name]: event.target.value})
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
                completed_date: this.state.updatedCompletionDate,
                status: this.state.updatedStatus,


        })
        }
        let id = this.props.project.id
        fetch(API_BASE + `/projects/${id}`, configObject)
        .then(res => res.json())
        .then(data => {
          this.props.updateStateOnEdit(data)
        })
    }

render () {
return (
    <div>This is a PM Edit Project Form
    <form >
    <label>
      Status: 
      <select      
      name="updatedStatus"
      value={this.state.updatedStatus} 
      onChange={this.handlePMEditProjectChange} >
        <option value="in progress">In Progress</option>
        <option value="complete">Complete</option>
      </select>
    </label><br></br>
    <label>
      Completed Date: 
      <input 
      type="date" 
      name='updatedCompletionDate' 
      value={this.state.updatedDescription} 
      onChange={this.handlePMEditProjectChange} />
    </label><br></br> 
    <input type="submit" value="Submit Request" onClick={(event) => this.editProject(event)}/>
  </form>
    </div>
)
}

}

export default PMEditProjectForm
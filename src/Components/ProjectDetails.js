import React from 'react';
import { API_BASE } from '../constants'

class ProjectDetails extends React.Component {
// TO DO:
// -Add approve functionality for approvers
// -Add edit functionality for PMs
// -Figure out what the issue with department and usernames is, works correctly on project cards, although that uses passed down props rather than state

    state = {
        project: {}
    }

    componentDidMount(){
        let id = this.props.match.params.id
        fetch(API_BASE + `/projects/${id}`)
        .then(res => res.json())
        .then(data => { 
          this.setState({ project: data })
        })
      }

    renderProjectDetails = () => {
        // const department = this.state.project.department
        return (
            <div className='project-details'>
                <h3>Project Name: {this.state.project.project_name}</h3>
                <h4>Description: {this.state.project.description}</h4>
                <h4>Budget: {this.state.project.budget}</h4>
                <h4>Location ID: {this.state.project.location_id}</h4>
                {/* <h4>Department: {department.name}</h4> */}
                {/* <h4>Submitter: {this.state.project.user.username}</h4>  */}
                <h4>Submitted Date: {this.state.project.submitted_date}</h4>
                <h4>Required Completion Date: {this.state.project.required_completion_date}</h4>
                <h4>Approved Date: {this.state.project.approved_date}</h4>
                <h4>Approved By: {this.state.project.approved_by}</h4>
                <h4>Completed Date: {this.state.project.completed_date}</h4>
                <h4>Status: {this.state.project.status}</h4>
            </div>
        )

    }

    render() {
    return (
        <div>This is a Project Details Component
            {this.renderProjectDetails()}
        </div>

    )
    }

}

export default ProjectDetails;
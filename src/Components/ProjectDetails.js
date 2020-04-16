import React from 'react';
import { API_BASE } from '../constants'
import EditProjectForm from '../Components/EditProjectForm';
import PMEditProjectForm from '../Components/PMEditProjectForm'
import CommentCard from '../Components/CommentCard';

class ProjectDetails extends React.Component {
// TO DO:
// -Add edit functionality for PMs

    state = {
        project: {
            user: {},
            department: {},
            location: {}
        },
        showEditForm: false,
        showPMEditForm: false,
        comments: []

    }

    componentDidMount(){
        let id = this.props.match.params.id
        fetch(API_BASE + `/projects/${id}`)
        .then(res => res.json())
        .then(data => { 
          this.setState({ project: data })
        })
        this.getComments()
      }

    getComments = () => {
        fetch(API_BASE + '/comments/')
        .then(res => res.json())
        .then(data => this.setState({ comments: data}))
    }

    displayComments = () => {
        let commentsToDisplay = this.state.comments.filter(comment => comment.project_id === parseInt(this.props.match.params.id))
        return (
            commentsToDisplay.map(comment => <CommentCard key={comment.id} comment={comment}/>)
        )
    }

    renderProjectDetails = () => {
        return (
            <div className='project-details'>
                <h3>Project Name: {this.state.project.project_name}</h3>
                <h4>Description: {this.state.project.description}</h4>
                <h4>Budget: {this.state.project.budget}</h4>
                <h4>Location: {this.state.project.location.address}</h4>
                <h4>Department: {this.state.project.department.name}</h4>
                <h4>Submitter: {this.state.project.user.username}</h4> 
                <h4>Submitted Date: {this.state.project.submitted_date}</h4>
                <h4>Required Completion Date: {this.state.project.required_completion_date}</h4>
                <h4>Approved Date: {this.state.project.approved_date}</h4>
                <h4>Approved By: {this.state.project.approved_by}</h4>
                <h4>Completed Date: {this.state.project.completed_date}</h4>
                <h4>Status: {this.state.project.status}</h4>
            </div>
        )
    }

    renderApproveButton = () => {
        if (this.props.validatedUser.user_type === 'approver' && this.state.project.status === 'pending') {
            return (
                <button onClick={() => this.approveProject()}>Approve</button>
            )
        }
    }

    renderSubmitterEditButton = () => {
        if (this.props.validatedUser.user_type === 'submitter' && this.state.project.status === 'pending') {
            return (
                <button onClick={() => this.setState({showEditForm : !this.state.showEditForm})}>Edit Project</button>
            )
        }
    }

    renderPMEditButton = () => {
        if (this.props.validatedUser.user_type === 'project manager' && (this.state.project.status === 'approved' || this.state.project.status === 'in progress') ) {
            return (
                <button onClick={() => this.setState({showPMEditForm : !this.state.showPMEditForm})}>PM Edit Project</button>
            )
        }

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

    approveProject = () => {
        const configObject = {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                'accept': 'application/json'
            },
            body: JSON.stringify ({ 
                status: 'approved',
                approved_date: this.getCurrentDate(),
                approved_by: this.props.validatedUser.username
        })
        }
        let id = this.props.match.params.id
        console.log(id)
        fetch(API_BASE + `/projects/${id}`, configObject)
        .then(res => res.json())
        .then(data => {this.setState({ project: data })
        this.props.updateProjectListOnEdit(data)
            }
        )
    }

    updateStateOnEdit = (data) => {
        this.setState({ project: data})
    }
   
    render() {
    return (
        <div>
            {this.renderProjectDetails()}
            {this.renderApproveButton()}
            {this.renderSubmitterEditButton()}
            {this.renderPMEditButton()}
            {this.displayComments()}
            {this.state.showEditForm ? <EditProjectForm project={this.state.project} updateStateOnEdit={this.updateStateOnEdit}/> : null}
            {this.state.showPMEditForm ? <PMEditProjectForm project={this.state.project} updateStateOnEdit={this.updateStateOnEdit}/> : null}
            <button onClick={() => this.props.history.goBack()}>Back</button>
        </div>

    ) 
    }

}

export default ProjectDetails;
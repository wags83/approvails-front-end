import React from 'react';
import { API_BASE } from '../constants'
import EditProjectForm from '../Components/EditProjectForm';
import PMEditProjectForm from '../Components/PMEditProjectForm'
import CommentCard from '../Components/CommentCard';
import '../assets/styles.scss'

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
        <div  >
            
                <h3>Project Name: {this.state.project.project_name}</h3>
                <p>Description: {this.state.project.description}</p>
                <p>Budget: {this.state.project.budget}</p>
                <p>Location: {this.state.project.location.address}</p>
                <p>Department: {this.state.project.department.name}</p>
                <p>Submitter: {this.state.project.user.username}</p> 
                <p>Submitted Date: {this.state.project.submitted_date}</p>
                <p>Required Completion Date: {this.state.project.required_completion_date}</p>
                <p>Approved Date: {this.state.project.approved_date}</p>
                <p>Approved By: {this.state.project.approved_by}</p>
                <p>Completed Date: {this.state.project.completed_date}</p>
                <p>Status: {this.state.project.status}</p>
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
        fetch(API_BASE + `/projects/${id}`, configObject)
        .then(res => res.json())
        .then(data => {this.setState({ project: data })
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
            <button onClick={() => this.props.history.goBack()}>Back</button>
            {this.displayComments()}
            {this.state.showEditForm ? <EditProjectForm project={this.state.project} updateStateOnEdit={this.updateStateOnEdit} updateProjectListOnEdit={this.props.updateProjectListOnEdit}/> : null}
            {this.state.showPMEditForm ? <PMEditProjectForm project={this.state.project} updateStateOnEdit={this.updateStateOnEdit} updateProjectListOnEdit={this.props.updateProjectListOnEdit}/> : null}
        </div>

    ) 
    }

}

export default ProjectDetails;
import React from 'react';
import { API_BASE } from '../constants';

const initialPayload = {
  project_name: '',
  description: '',
  user_id: undefined,
  budget: '',
  submitted_date: '',
  required_completion_date: '',
  approved_date: '',
  approved_by: '',
  completed_date: '',
  status: 'pending',
  location_id: ''
}

class RequestForm extends React.Component {

  state = {
    username: "",
    department: "",
    locations: [],
    requestPayload: initialPayload
  }
  
  componentDidMount() {
      this.getLocations()
      this.getCurrentDate()
  }

  getCurrentUser = () => {
    this.setState({
      username: this.props.validatedUser.username, 
      department: this.props.validatedUser.department.name, 
      requestPayload: { ...this.state.requestPayload, user_id: this.props.validatedUser.id}
    })
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
    this.setState({ requestPayload: { ...this.state.requestPayload, submitted_date: full_date } },() => this.getCurrentUser())
  }

  getLocations = () => {
      fetch(`${API_BASE}/locations`)
      .then(resp => resp.json())
      .then(locations => this.setState({ locations }))
  }

  handleMakeRequestChange = (e) => {
    this.setState({ requestPayload: { ...this.state.requestPayload, [e.target.name]: e.target.value } })
  }

  handleSubmitRequest = (e) => {
    e.preventDefault()

    const obj = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state.requestPayload)
    }

    fetch(`${API_BASE}/projects`, obj)
    .then(response => response.json())
    .then(data => console.log('Success', data)).then(() => this.setState({ requestPayload: initialPayload }))
    .then(alert(
      `Request submitted successfully.  Go to Dashboard to view the request's status.`))
    .catch(error => console.log('Error', error))
  }

  render () {
    return (
      <div className="base-container" >
        <div className="content">
          <form className="form" onSubmit={e => this.handleSubmitRequest(e)}>
            <div className="header">Make a Request</div>
            <div className="form-group">
              <label>Project Name:</label>
              <input type="text" name='project_name' value={this.state.requestPayload.project_name} onChange={e => this.handleMakeRequestChange(e)} placeholder="project name"/>
            </div>
            <div className="form-group">
              <label>Description:</label>
              <input type="text" name='description' value={this.state.requestPayload.description} onChange={e => this.handleMakeRequestChange(e)} placeholder="description"/>
            </div>
            <div className="form-group">
              <label>Budget:</label>
              <input type="number" step="0.01" name='budget' value={this.state.requestPayload.budget} onChange={e => this.handleMakeRequestChange(e)} placeholder="budget"/>
            </div>
            <div className="form-group">
              <label>Location:</label>
              <select onChange={(e) => this.setState({ requestPayload: { ...this.state.requestPayload , location_id: e.target.value }})}>
               {this.state.locations.map((location) => <option key={location.id} value={parseInt(location.id)}>{location.address}</option>)}
               </select> 
            </div>
            <div className="form-group">
              <label>Required Completion Date:</label>
               <input type="date" name='required_completion_date' value={this.state.requestPayload.required_completion_date} onChange={e => this.handleMakeRequestChange(e)} />
            </div>
            <div className="form-group">
              <label>Username: {this.state.username}</label>
            </div>
            <div className="form-group">
              <label>Department: {this.state.department}</label>
            </div>
            <div className="form-group">
              <label>Submitted Date:</label>
               <input type="text" name='submitted_date' value={this.state.requestPayload.submitted_date} readOnly />
            </div>
            <div className="footer">
              <button type='submit' className="btn">Submit Request</button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default RequestForm;


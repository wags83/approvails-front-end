import React from 'react';
import { API_BASE }  from '../constants'
import LogoImg from '../assets/LogoImg'
import '../assets/styles.scss'


class SignupForm extends React.Component { 
    state = {
        departments: []
    }


    componentDidMount() {
        fetch(`${API_BASE}/departments`)
        .then(response => response.json())
        .then(data => this.setState({ 
            departments: data 
        }))
    }
     
    render() {
        const history = this.props.history
        
        return (
            <div className="base-container" >
                <div className="content">
                    <div className="image">
                        <LogoImg />
                    </div>
                    <form className="form" onSubmit={e => this.props.handleCreateNewUser(e, history)}>
                        <div className="header">Sign up</div>
                        <div className="form-group">
                            <label>Name</label>
                            <input type='text' name='name' value={this.props.stateProps.signup.name} onChange={e => this.props.handleSignupOnChange(e)} placeholder="name"/>
                        </div>
                        <div className="form-group">
                            <label>Username</label>
                            <input type='text' name='username' value={this.props.stateProps.signup.username} onChange={e => this.props.handleSignupOnChange(e)} placeholder="username"/>
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input type='password' name='password' value={this.props.stateProps.signup.password} onChange={e => this.props.handleSignupOnChange(e)} placeholder="password" />
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input type='text' name='email' value={this.props.stateProps.signup.email} onChange={e => this.props.handleSignupOnChange(e)} placeholder="email"/>
                        </div>
                        <div className="form-group">
                            <label>User Type</label>
                            <select name='user_type' onChange={e => this.props.handleSignupOnChange(e)} defaultValue='Project Manager'>
                                <option value='project manager' >Project Manager</option>
                                <option value='submitter' >Submitter</option>
                                <option value='approver' >Approver</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Department</label>
                            <select name='department_id' onChange={e => this.props.handleSignupOnChange(e)} defaultValue={this.state.departments[(Math.floor((Math.random() * this.state.departments.length)))]}>
                                {this.state.departments.map((department, index) => <option key={department.id} value={parseInt(department.id)} >{department.name}</option>)}
                            </select>
                        </div>
                        <div className="footer">
                            <button type='submit' className="btn">Sign up</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }

}

export default SignupForm;
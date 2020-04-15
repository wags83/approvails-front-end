import React from 'react';
import { API_BASE }  from '../constants'


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
        console.log(this.state)
        return (
            <div>
                <h1>Sign up</h1>
                <form onSubmit={e => this.props.handleCreateNewUser(e)}>
                    <label>Name
                        <input type='text' name='name' value={this.props.stateProps.signup.name} onChange={e => this.props.handleSignupOnChange(e)}/>
                    </label>

                    <label>Username
                        <input type='text' name='username' onChange={e => this.props.handleSignupOnChange(e)}/>
                    </label>

                    <label>Password
                        <input type='password' name='password' onChange={e => this.props.handleSignupOnChange(e)}/>
                    </label>

                    <label>Email
                        <input type='text' name='email' onChange={e => this.props.handleSignupOnChange(e)}/>
                    </label>

                    <label>User Type
                        <select name='user_type' onChange={e => this.props.handleSignupOnChange(e)} defaultValue='Project Manager'>
                            <option value='project manager' >Project Manager</option>
                            <option value='submitter' >Submitter</option>
                            <option value='approver' >Approver</option>
                        </select>
                    </label>

                    <label>Department
                        <select name='department_id' onChange={e => this.props.handleSignupOnChange(e)} defaultValue={this.state.departments[(Math.floor((Math.random() * this.state.departments.length)))]}>
                            {this.state.departments.map((department, index) => <option key={department.id} value={parseInt(department.id)} >{department.name}</option>)}
                        </select>
                    </label>

                    <button type='submit'>Sign up</button>
                </form>
            </div>
        )
    }

}

export default SignupForm;
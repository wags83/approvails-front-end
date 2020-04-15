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
                <div>This is Signup Form</div>
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
                            <option >Project Manager</option>
                            <option>Submitter</option>
                            <option>Approver</option>
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
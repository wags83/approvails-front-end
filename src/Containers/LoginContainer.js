import React from 'react';
import LoginForm from '../Components/LoginForm'
import SignupForm from '../Components/SignupForm'

class LoginContainer extends React.Component {
    state = {
        logInForm: true
    }

    handleToLogIn = () => 
        <div>
            <LoginForm handleLoginOnChange={this.props.handleLoginOnChange} stateProps={this.props.stateProps} handleSignin={this.props.handleSignin} {...this.props}/>
        </div>
    
    hanleToSignUp = () => 
        <div>
            <SignupForm stateProps={this.props.stateProps} handleSignupOnChange={this.props.handleSignupOnChange} handleCreateNewUser={this.props.handleCreateNewUser}/>
        </div>
    
    handleFormType = () => {
        this.setState(prevState => ({logInForm: !prevState.logInForm}))
    }

    render() {
        // console.log(this.props)
        return (
            <div>
                <div>This is Login Container</div>
                {this.state.logInForm ? this.handleToLogIn() : this.hanleToSignUp()}
        
                <button onClick={this.handleFormType} >Sign up</button>
            </div>
        )
    }
}



export default LoginContainer;
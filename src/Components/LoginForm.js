import React from 'react';


const LoginForm = (props) => {
    let history = props.history

    return (
        <div>
            <form onSubmit={(e) => props.handleSignin(e, history)}>
                <label>Username
                <input type='text' name='username' value={props.stateProps.username} onChange={e => props.handleLoginOnChange(e)} />
                </label>

                <label>Password
                <input type='password' name='password' value={props.stateProps.password} onChange={e => props.handleLoginOnChange(e)} />
                </label>

                <button type='submit'>Sign in</button>
            </form>
        </div>
    )
}

export default LoginForm;
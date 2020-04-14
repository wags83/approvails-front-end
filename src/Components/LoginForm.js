import React from 'react';


const LoginForm = (props) => {
    return (
        <div>
            {/* {console.log(props.handleSignin)} */}
            <div>This is Login Form</div>

            <form onSubmit={props.handleSignin}>
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
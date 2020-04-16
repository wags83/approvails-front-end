import React from 'react';
import LogoImg from '../assets/LogoImg'
import '../assets/styles.scss'


const LoginForm = (props) => {
    let history = props.history

    return (
        <div className="base-container" >
            <div className="content">
                <div className="image">
                    <LogoImg />
                </div>
                <div className="form">
                    <div className="header">Login</div>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input type="text" name="username" placeholder="username" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" placeholder="password" />
                    </div>
                </div>
            </div>
            <div className="footer">
                <button type="button" className="btn">
                    Login
                </button>
            </div>
        </div>

        // <div>
        //     <form onSubmit={(e) => props.handleSignin(e, history)}>
        //         <label>Username
        //         <input type='text' name='username' value={props.stateProps.username} onChange={e => props.handleLoginOnChange(e)} />
        //         </label>

        //         <label>Password
        //         <input type='password' name='password' value={props.stateProps.password} onChange={e => props.handleLoginOnChange(e)} />
        //         </label>

        //         <button type='submit'>Sign in</button>
        //     </form>
        // </div>
    )
}

export default LoginForm;
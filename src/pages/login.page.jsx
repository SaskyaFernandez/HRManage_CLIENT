import React from 'react';
import LoginForm from '../composants/Auth/login/login';
const Login = () => {
    return (
        <div className='loginParent'>
            <div>
                <div className='signIn'>
                    <p>Welcome!!</p>
                    <h1 className='title'>Please Sign In</h1>
                </div>
                <LoginForm />
            </div>
            <div>
                <img src="/loginImage.jpeg" alt="image" />
            </div>
        </div>
    )
}
export default Login;
import React from 'react';
import LoginComposant from '../composants/Auth/login/login';
const Login = () => {
    return (
        <div className='loginParent'>
            <div>
                <div className='signIn'>
                    <p>Welcome!!</p>
                    <h1 className='title'>Please Sign In</h1>
                </div>
                <LoginComposant />
            </div>
            <div>
                <img src="../public/loginImage.jpeg" alt="image" />
            </div>
        </div>
    )
}
export default Login;